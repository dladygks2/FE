const http = require('http');
const fs = require('fs'); 

//서버에서 이미지파일 불러오기
http.createServer((req, res) => {
   fs.readFile('node.png', (err, data) => {
      if(err){
         console.log(err);
      }else{
         res.writeHead(200, {'content-type':'image/png'});
         res.end(data);
      }

   });
}).listen(3000, () => {
    console.log('이미지 서버 실행중...');
});




//서버에서 사운드파일 실행하기
http.createServer((req, res) => {
    fs.readFile('sunny.mp3', (err, data) => {
       if(err){
          console.log(err);
       }else{
          res.writeHead(200, {'content-type':'audio/mp3'});
          res.end(data);
       }
 
    });
 }).listen(3001, () => {
     console.log('사운드 서버 실행중...');
 });


//cls 커멘드창 정리