const express = require('express');
const bodyparser = require('body-parser');//body 데이터 입력하거나 출력하기 위해(post)
const expressSession = require('express-session'); // npm i express-session
const fs = require('fs');

const app =express();
const port =3000;

app.use(bodyparser.urlencoded({extended: false}));

//쿠키를 암호화로 사용할 특수문자 기입
app.use(expressSession({
    secret:'!@#$%^&*()', //쿠키를 임의로 변조하는 것을 방지하기 위한 값(암호화)
    resave:false,//세션을 언제나 저장할지 지정하는 값/false로 하는 것을 권장
    saveUninitialized: true//저장되기 전에 saveUninitialized 상태로 미리 만들어서 저장
}));

//로그인 
app.get('/login',(req,res) => {
    fs.readFile('login.html', 'utf8',(err,data) => {
        if(!err){
             res.writeHead(200, {'content-type':'text/html'});
             res.end(data); 
        }else{
            console.log(err);
        }
    })
});

//로그인된 값을 전달
app.post('/loginOk',(req,res) => {
     const userid = req.body.userid;
     const userpw = req.body.userpw;
     //확인
     console.log(userid);
     console.log(userpw);

     // admin / 1234
     if(userid == 'admin' && userpw == '1234'){
         req.session.member ={
             id:userid,
             userpw:userpw,
             isauth: true
         };
         res.redirect('/welcome');   
     }else{
         res.redirect('/fail');
     }

});

//로그인이 성공했을때
app.get('/welcome',(req,res) => {
    if(req.session.member){//세션정보 있는지 확인
        console.log(req.session.member);
        fs.readFile('welcome.html', 'utf8',(err,data) => {
                res.writeHead(200,{'content-type':'text/html'});
                res.end(data)
        })
    }else{
     res.redirect('/login');//세션의 정보가 없다는 것은  로그인을 다시 해야함
    }
});

//로그인 실패했을때
app.get('/fail',(req,res) => {
   fs.readFile('fail.html', 'utf8',(err,data) => {
    res.writeHead(200, {'content-type':'text/html'});
    res.end(data);
   });
});

//정상적으로 로그인 되었을때 로그아웃할때
app.get('/logout',(req,res) => {
    req.session.destroy(() => {
        console.log('세션이 삭제되었습니다'); 
    });
    res.redirect('/login');
});





app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});