const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan'); //접속자 정보를 관리하는 모듈
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const static = require('serve-static');//페이지에 직접접근해주는 모듈
const path = require('path');//url 접근을 해야 하므로 패스모듈 설치
const passport = require('passport');// npm i passport

const expressErrorHandler = require('express-error-handler');// npm i express-error-handler

const app = express();
const router = express.Router();

//세션정보 설정
app.use(cookieParser());
app.use(expressSession({
    secret: '!@#$%^&*()', //정보를 암호화에 사용 문자입력
    resave: false,        //지속적인 저장을 하지 않게 함
    saveUninitialized: true, //초기화 저장이 되지 않게 함
    cookie: { maxAge: 60 * 60 * 1000 } //쿠키 저장되는 시간
}));
app.use(logger('dev'));

app.use(passport.initialize()); // 패스포트 초기화
app.use(passport.session());// 섹션객체 생성
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, "public")));//폴더로 직접 접근 404 오류 페이지에 위치로 설정


app.use('/', router);
//페이지 연결이 오류일때 뜰 404페이지 설정
const errorHandle = expressErrorHandler({
    static: {
        '404':'./public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandle);


//뷰템플리 엔진 설정
// app.set('views', __dirname + '/views');
// app.use('view engine','ejs');


//[사용자정의 모듈 설정]
//서버정보
const config = require('./config/config');
//데이터베이스 연결
const database = require('./database/database');

//세션정보
const configPassport = require('./config/passport');
configPassport(app,passport);

//라우터 연결 
const userPassport = require('./routes/route_member');
userPassport(router, passport);






app.listen(config.server_port, ()=> {
    console.log(`${config.server_port}포트로 서버 실행중...`);
    database.init(app, config);
});