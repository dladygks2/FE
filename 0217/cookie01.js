const express = require('express');
const cookieParser = require('cookie-parser');// npm i cookie-parser

const app =express();
const port =3000;

app.use(cookieParser());

app.get('/setCookie',(req, res) => { 
    console.log('setCookie 호출');//라우터실행여부확인

    res.cookie('member',{//쿠키 설정하기
        id: 'apple',
        name: '김사과',
        gender: 'female'
    },{
        maxAge: 1000 * 60 * 3 //만료시간을 설정
    });
     res.redirect('/showCookie');//라우터이동
});

app.get('/showCookie',(req, res) => {
    console.log('/showCookie 호출');
    res.send(req.cookies);
    res.end();
});





app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});