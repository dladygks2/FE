module.exports = {
    server_port:3000,
    db_url:'mongodb://localhost:27017/frontenddb',
    db_schemas:[{file:'./member_schema', collection:'member2', schemaName:'MemberSchema', 
    modelName:'MemberModel'}],//스키마파일이 저장될위치, 스키마 적용될 컬레션, 스키마 이름, 모델이름
    FontFace:{
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }
}