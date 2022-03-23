const express = require('express');
const bodyParser = require('body-parser');//post방식전달
// npm i mongodb
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

let database;//몽고디비 연결 객체

//mongodb 연결함수
function connectDB(){
   const databaseURL = "mongodb://localhost:27017"; //몽고디비 프로토콜
   MongoClient.connect(databaseURL,(err,db) => {
       if(!err){
           const tempdp = db.db('frontenddb');//접근하고자 하는 데이터베이스의 이름
           database = tempdp;
           console.log('mongodb 데이터베이스 연결 성공!');
       }else{
           console.log(err);
       }
   });

}


// 회원가입
// http://localhost:3000/member/regist (post)
router.route('/member/regist').post((req,res) => {
    console.log('/member/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;

    console.log(`userid:${userid},userpw:${userpw},username:${username},age:${age}`);
    //포스트맨에서 요청부분 확인

    if(database){
        joinMember(database,userid,userpw,username,age, (err,result) => {
            if(!err){//데이터 입력시 에러발생여부
                if(result.insertedCount > 0){
                    res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>가입에 성공 되었습니다.</p>');
                    res.end(); 
                }else{
                    res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.write('<p>가입에 실패 되었습니다.</p>');
                    res.end(); 
                }
            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>오류가 발생했습니다.</p>');
                res.end(); 
            }
        });
    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }


})


// 로그인
// http://localhost:3000/member/login (post)
router.route('/member/login').post((req,res) => {
    console.log('/member/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid:${userid}, userpw:${userpw}`);

    if(database){
        loginMember(database,userid,userpw, (err,result) => {
          if(!err){
            if(result){
                //로그인도니 상태를 출력
                const resultUserid = result[0].userid;  
                const resultUserpw = result[0].userpw; 
                const resultUsername = result[0].username; 
                const resultAge = result[0].age;  

                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write(`<p>${resultUserid}(${resultUsername})</p>`);
                res.write(`<p>나이: ${resultAge}</p>`);
                res.end(); 
            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                res.end(); 
            }
          }else{
            res.writeHead('200',{'content-type':'text/html;charset=utf8'});
            res.write('<h2>로그인 실패</h2>');
            res.write('<p>서버 오류 발생! 로그인에 실패했습니다.</p>');
            res.end();    
          }

        });


    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end(); 
    }


});


// 정보 수정
// http://localhost:3000/member/edit (post)
router.route('/member/edit').post((req,res) => {
    console.log('/member/edit 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;

    console.log(`userid:${userid},userpw:${userpw},username:${username},age:${age}`);

    if(database){
        editMember(database,userid,userpw,username,age, (err,result) => {
            if(!err){
                if(result.modifiedCount > 0){
                    res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원정보 수정 성공</h2>');
                    res.write('<p>정보 수정에 성공했습니다.</p>');
                    res.end();   
                }else{
                    res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원정보 수정 실패</h2>');
                    res.write('<p>정보 수정에 실패했습니다.</p>');
                    res.end();   
                }    
            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>서버 오류 발생! 로그인에 실패했습니다.</p>');
                res.end();     
            }
        });
       

    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end(); 
    }

});


// 회원 삭제
// http://localhost:3000/member/delete (post)
router.route('/member/delete').post((req,res) => {
    console.log('/member/delete 호출');
    const userid = req.body.userid;
    console.log(`userid:${userid}`);

    if(database){
        deleteMember(database, userid, (err, result) =>{
            if(!err){
                if(result.deletedCount > 0){
                    res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                    res.write('<h2>데이터베이스 삭제 성공</h2>');
                    res.write('<p>회원 정보 삭제에 성공했습니다.</p>');
                    res.end();   
                }else{
                    res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                    res.write('<h2>데이터베이스 삭제 실패</h2>');
                    res.write('<p>회원 정보 삭제에 실패했습니다.</p>');
                    res.end();   
                }
            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 삭제 실패</h2>');
                res.write('<p>서버 오류 발생! 회원 정보 삭제에 실패했습니다.</p>');
                res.end();  
            }
        }); 
    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end(); 
    }

})





//callbacks-------------------------------------------------------------------------------
const joinMember = function(database,userid,userpw,username,age,callback){
    console.log('joinMember 호출!');
    const members = database.collection('member');//컬렉션을 객체로 가져옴
     //members.insertMany()컬렉션을 저장 
     members.insertMany([{userid:userid,userpw:userpw,username:username,age:age}],(err,result)=>{
        if(!err){//인설트하면서 에러가 나지 않았다면 
            //인설트 실행시 insertedCount
            if(result.insertedCount > 0){
                console.log(`사용자 document ${result.insertedCount}명 추가 되었음!`);
             }else{
                console.log(`사용자 document 추가되지 않음!`);
             }
             callback(null,result);
             return;
        }else{
            console.log(err);
            callback(err,null)//callback(오류가 발생했을때 오류저장변수,데이터베이스에 정상적인 처리 상태 )
        }
        
     })
};


const loginMember = function(database,userid,userpw, callback){
    console.log('loginMember 호출!');
    const members = database.collection('member');
    //members.find() 데이터베이스 객체 찾기
    members.find({userid:userid,userpw:userpw}).toArray((err,result) => {
        //find()는 여러개의 객체를 찾을수 있기 때문에 기본설정으로 toArray()를 사용함
        if(!err){
            if(result.length > 0){
                console.log('사용자를 찾았습니다.');
                callback(null, result);
            }else{
                console.log('일치하는 사용자가 없습니다.');
                callback(null, null);
            }
            return;
        }else{
            console.log(err);
            callback(err, null);
        }
    });
}


const editMember = function(database,userid,userpw,username,age,callback){
    console.log('editMember 호출!');
    const members = database.collection('member');
     //updateOne({대상객체},{수정(전부를 다 입력 )});
     members.updateOne({userid:userid},{$set:{userid:userid,userpw:userpw,username:username,age:age}},(err,result)=>{
        if(!err){
                    if(result.modifiedCount > 0){//modifiedCount 포로퍼티 수정한 갯수
                        console.log(`사용자 document ${result.modifiedCount}명 수정됨`);
                    }else{
                        console.log('수정된 document 없음');
                    }
                    callback(null,result);
        }else{
            console.log(err)
            callback(err,null)
        }  
     })
}

const deleteMember = function(database, userid,callback){
    console.log('deleteMember 호출!');
    const members = database.collection('member');
    members.deleteOne({userid:userid},(err,result) => {
       if(!err){
          if(result.deletedCount > 0){
            console.log(`사용자 document ${result.deletedCount}명 삭제됨`);
          }else{
            console.log('삭제된 document 없음');
          }   
          callback(null,result);
          return;
       }else{
           console.log(err);
           callback(err,null);
       }
    });
}






app.use("/", router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중...`);
    connectDB();//데이터베이스 연결함수 호출
});