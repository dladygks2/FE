const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const router = express.Router();//Router 객체 만들기

app.use(bodyParser.urlencoded({extended:false}));

//라우터생성
// 라우터객체.route(요청패스).get(실행할 함수);
// 라우터객체.route(요청패스).post(실행할 함수);

//http://localhost:3000/member/login -> post요청
router.route('/member/login').post((req,res) => {
    console.log('/member/login 호출!');
});

//http://localhost:3000/member/regist -> post요청
router.route('/member/regist').post((req, res) => {
    console.log('/member/regist 호출!');
});

//http://localhost:3000/member/about -> get요청
router.route('/member/about').get((req, res) => {
    console.log('/member/about 호출!');
});


app.use('/',router);//익스프레스에 Router 객체 적용

//에러가 발생했을때
app.all('*',(req,res) => {
   res.status(404).send('<h2>페이지를 찾을 수 없습니다</h2>');
});


app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`)
});