const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');// npm i mongoose

const port = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));

// 데이테 베이스 연결
let database;//데이터베이스 연결 상태의 객체
let UserSchema;//데이터베이스의 조건 설정을 스키마로 객체로 설정
let UserModel;// 스키마를 기준으로 형태설정(모델)

function connectDB(){
     const url = "mongodb://localhost:27017/frontenddb";
     console.log('데이터베이스 연결 시도중 ... ');
     
     mongoose.Promise = global.Promise;
     mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
     database = mongoose.connection;
     //객체.on('이벤트선언',실행할 함수( () => {} ))
     database.on('error', console.error.bind(console, "mongoose 연결 실패!"))
     database.on('open', () => {
        UserSchema = mongoose.Schema({//스키마설정(제약조건)
            userid: String,
            userpw: String,
            username: String,
            gender: String
        });
        console.log('UserSchema 생성 완료!');

        UserSchema.static('findAll',function(callback){
            return this.find({},callback)
        });

        UserModel = mongoose.model('user',UserSchema);//스키마를 이용해서 데이터베이스 객체 구성을 형상화
        console.log('UserModel이 정의되었습니다.');
     });


     // localhost:3000/user/regist (post)
     router.route('/user/regist').post((req,res) => {
        console.log('/user/regist 호출!');
        
        const userid = req.body.userid;
        const userpw = req.body.userpw;
        const username = req.body.username;
        const gender = req.body.gender;

        console.log(`userid:${userid}, userpw:${userpw}, username:${username}, gender:${gender}`);

        if(database){
            joinUser(database,userid,userpw,username,gender,(err,result) => {
                if(!err){
                    if(result){
                        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                        res.write('<h2>회원가입 성공</h2>');
                        res.end();
                    }else{
                        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                        res.write('<h2>회원가입 실패</h2>');
                        res.end();
                    }
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>서버에러, 회원가입 실패</h2>');
                    res.end();
                }

            })
        }else{
            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결실패</h2>');
            res.end();
        }
     });



     // localhost:3000/user/login (post)
     router.route('/user/login').post((req, res) => {
        console.log('/user/login 호출!');
        const userid = req.body.userid;
        const userpw = req.body.userpw;

        console.log(`userid:${userid}, userpw:${userpw}`);

        if(database){
            loginUser(database,userid,userpw,(err,result) => {
                if(!err){
                    if(result){
                        //회원가입일경우 기본정보만 화면에 출력
                        console.dir(result);
                        const username = result[0].username;
                        const gender = result[0].gender;

                        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                        res.write('<h2>로그인 성공</h2>');
                        res.write(`<p>아이디 : ${userid}</p>`);
                        res.write(`<p>이름 : ${username}</p>`);
                        res.write(`<p>성별 : ${gender}</p>`);
                        res.end();
                    }else{
                        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                        res.write('<h2>로그인 실패</h2>');
                        res.end();
                    }
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>서버에러, 로그인 실패</h2>');
                    res.end();
                }

            })
        }else{
            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결실패</h2>');
            res.end();
        }



     });



     // localhost:3000/user/list (get)
     router.route('/user/list').get((req,res) => {
        if(database){

            UserModel.findAll((err, result) => {
                if(!err){
                        if(result){
                            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                            res.write('<h2>회원리스트</h2>');
                            res.write('<div><ul>');
                                for(let i=0; i<result.length; i++){ 
                                    const userid = result[i].userid;
                                    const username = result[i].username;
                                    const gender = result[i].gender; 
                                    res.write(`<li>${i} : ${userid} / ${username} / ${gender}</li>`);
                                }
                            res.write('</ul></div>');
                            res.end(); 
                        }else{
                            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                            res.write('<h2>회원 정보가 없습니다</h2>');
                            res.end(); 
                        }
                }else{
                    console.log('리스트 조회 실패'); 
                }
            });
            
        }else{
            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결실패</h2>');
            res.end();
        }
     })

}

//---------------------------------------------------------------------------------------------

const joinUser = function(database,userid,userpw,username,gender, callback){
    console.log('joinUser 호출!');
    const users =new UserModel({userid:userid,userpw:userpw,username:username,gender:gender});
    users.save((err, result) => {
        if(!err){
            console.log('회원 document가 추가되었습니다.');
            callback(null, result);
            return;
        }
        callback(err, nul);
    })
}



const loginUser = function(database,userid,userpw,callback){
    console.log('loginUser 호출!');

   UserModel.find({userid:userid, userpw:userpw},(err,result) => {
    if(!err){
        if(result.length > 0){
            console.log('일치하는 사용자를 찾음');
            callback(null, result);
        }else{
            console.log('일치하는 사용자가 없음');
            callback(null, null);
        }   
        return;
    }
    callback(err, null);
   });
}


























app.use("/", router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중...`);
    connectDB();
});