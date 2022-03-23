const express = require('express');

const bodyParser = require('body-parser');

const logger = require('morgan');

const mongoose = require('mongoose');// npm i mongoose



const port = 3000;

const app = express();

const router = express.Router();



app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));



// 데이테 베이스 연결

let database;//데이터베이스 연결 상태의 객체

let UserSchema;//데이터베이스의 조건 설정을 스키마로 객체로 설정

let UserModel;// 스키마를 기준으로 형태설정(모델)



function connectDB() {

    const url = "mongodb://localhost:27017/frontenddb";

    console.log('데이터베이스 연결 시도중 ... ');



    mongoose.Promise = global.Promise;

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

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



        UserSchema.static('findAll', function (callback) {

            return this.find({}, callback)

        });



        UserModel = mongoose.model('user', UserSchema);//스키마를 이용해서 데이터베이스 객체 구성을 형상화

        console.log('UserModel이 정의되었습니다.');

    });




    // localhost:3000/user/regist (post)

    router.route('/user/regist').post((req, res) => {

        console.log('/user/regist 호출!');



        const userid = req.body.userid;

        const userpw = req.body.userpw;

        const username = req.body.username;

        const gender = req.body.gender;



        console.log(`userid:${userid}, userpw:${userpw}, username:${username}, gender:${gender}`);



        if (database) {

            joinUser(database, userid, userpw, username, gender, (err, result) => {

                if (!err) {

                    if (result) {

                        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

                        res.write('<h2>회원가입 성공</h2>');

                        res.end();

                    } else {

                        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

                        res.write('<h2>회원가입 실패</h2>');

                        res.end();

                    }

                } else {

                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

                    res.write('<h2>서버에러, 회원가입 실패</h2>');

                    res.end();

                }



            })

        } else {

            res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

            res.write('<h2>데이터베이스 연결실패</h2>');

            res.end();

        }

    });





    // localhost:3000/user/login (post)

    // localhost:3000/user/list (get)

}



//---------------------------------------------------------------------------------------------



const joinUser = function (database, userid, userpw, username, gender, callback) {

    console.log('joinUser 호출!');

    const users = new UserModel({ userid: userid, userpw: userpw, username: username, gender: gender });

    users.save((err, result) => {

        if (!err) {

            console.log('회원 document가 추가되었습니다.');

            callback(null, result);

            return;

        }

        callback(err, nul);

    })

}


app.use("/", router);



app.listen(port, () => {

    console.log(`${port}포트로 서버 동작중...`);

    connectDB();

});