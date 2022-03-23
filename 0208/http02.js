const http = require('http');
const fs = require('fs'); 

http.createServer((req, res) => {
   fs.readFile('test.html',(err, data) => {
     if(!err){
           res.writeHead(200, {'content':'text/html'});
           res.end(data);
     }else{

     } 
   });
}).listen(3000, () => {
    console.log('서버실행중...');
});

//cls 커멘드창 정리