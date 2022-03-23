const express = require('express');
const cookieParser = require('cookie-parser');// npm i cookie-parser
const bodyparser = require('body-parser');//body 데이터 입력하거나 출력하기 위해(post)
const fs = require('fs');

const app =express();
const port =3000;

app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser('!@#$%^&*()'));//쿠키를 암호화로 사용할 특수문자 기입

//로그인을 값을 전달
app.get('/login',(req,res) => {
   fs.readFile('login.html','utf8', (err, data) => { //예외처리
      if(!err){
          res.writeHead(200,{'content-type':'text/html'});
          res.end(data)
       }else{
           console.log(err);
       }
   }); 
});


//로그인이 정상적으로 실행이 되었다면
express().post('/loginOk',(req,res) => {
     const userid = req.body.userid;
     const userpw = req.body.userpw;
     console.log(userid);//데이터값 확인
     console.log(userpw);//데이터값 확인

     // admin / 1234 듣등 아이디와 패스워드를 설정 
     if(userid == 'admin' && userpw == '1234'){
        const expiresDay = new Date(Date.now()+(1000 * 60 * 60 * 24)); //24시간
        //완료 날짜 new Date()->현재날짜 -->new Date(현재날짜객체 + 특정시간)
        
        res.cookie('userid',userid,{expires:expiresDay,signed:true})
        res.redirect('/welcome');//로그인 성공했을때  페이지 이동
     }else{
       res.redirect('/fail');//로그인 실패했을때 페이지 이동
     }


})


//로그인 된 결과를 화면에 출력
app.get('/welcome',(req,res) => {
    const cookieUserid = req.signedCookies.userid;
    console.log(cookieUserid);
    if(cookieUserid){
        fs.readFile('welcome.html','utf8',(req,data) => {
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        });
    }else{
        res.redirect('/login');
    }  
})

//로그인이 실패했을때
app.get('/fail',(req, res) => {
    fs.readFile('fail.html', 'utf8', (err,data) => {
        res.writeHead(200, {'content-type':'text/html'});
        res.end(data);   
    })
});


//로그아웃을 했을때
app.get('/logout',(req, res) => {
    res.clearCookie("userid");//쿠키정보 삭제
    res.redirect('/login');
});


app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});