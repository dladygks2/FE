const mongoose = require('mongoose');
const connect = require('passport/lib/framework/connect');

let database = {};

database.init = function(app,config){
    console.log('database init() 호출!'); 
    connect(app,config);
} 

//데이터베이스 연결함수
function connect(app,config){
    console.log('connect() 호출!');
    mongoose.Promise = global.Promise;//비동기 처리
    //mongodb://localhost:27017/frontenddb
    mongoose.connect(config.url_db);
    database.db = mongoose.connection;
    //이벤트 생성(예외처리)
    database.db.on('error',console.error.bind(console, 'mongoose connection error'));
    database.db.on('open', () =>{
        console.log('데이터베이스 연결 성공!');
        //스키마를 생성하는 함수연결
        createSchema(app, config);
    })
}

//스키마
function createSchema(app, config){}


//모델





module.exports = database;//내보내기