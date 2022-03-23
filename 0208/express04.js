const express = require('express');
const app = express();
const port = 3000;

//localhost:3000(== 127.0.0.1:3000)
app.use('/', (req, res) => {
     console.log('첫번째 미들웨어 실행');

     console.dir(req.header)
     //console.dir에서 dir은 자바스크립트 객체의 속성을 출력
     const userAgent = req.header('User-Agent');
     //User-Agent는  HTTP 요청을 보내는 디바이스와 브라우저 등 
     //사용자 소프트웨어의 식별 정보를 담고 있는 request header의 한 종류
     console.log(userAgent);
     

    // http://localhost:3000/?userid=apple
    const paramName = req.query.userid; // get방식의 변수값을 가져옴
    console.log(paramName);

    res.writeHead(200,{'content-type':'text/html;charset=utf8'});
    res.write('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>');
    res.write('<h2>익스프레스 서버에서 응답한 메세지입니다222.</h2>');
    res.write(`<p>User-Agent : ${userAgent}</p>`);
    res.write(`<p>paramName : ${paramName}</p>`);
    res.end();
     
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중`);
});