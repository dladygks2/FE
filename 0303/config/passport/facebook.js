// npm i passport-facebook
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');

module.exports = function(app, passport){
   return  new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    //profileFields 간단로그인되었을때 화면에 보여질 내용
    profileFields:['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']},() => {
        console.log('passport의 facebook 호출');
        console.dir(profile);

        let database = app.get('database');
        database.MemberModel.findOne({userid: profile.id},(err,user) =>{
            if(err) return done(err);
            if(!user){
                const use =new database.MemberMode({
                    name: profile.displayName,
                    userid: profile.id,
                    provider: 'facebook',
                    authToken: accessToken,
                    facebook: profile._json
                }); 

                user.save((err) => {
                    if(err) { throw err; }
                    return done(null, user);
                });
            }else{
                return done(null, user);  
            }
        })
    })






}