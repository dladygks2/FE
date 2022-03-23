const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200,{'content-type':'text/html'});
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>http모듈테스트</title></head><body style="background-color: burlywood;"><p>처음으로 실행하는 node.js http 서버</p></body></html>');
}).listen(3000, () => {
    console.log('서버실행중...');
});

//cls 커멘드창 정리