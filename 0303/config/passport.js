const local_signup = require('./passport/local_signup');//회원가입
const local_login = require('./passport/local_login');//로그인
const facebook = require('./passport/facebook');//간단로그인

module.exports = function(app,passport){
    console.log('config/passport 호출!');

    passport.serializeUser((user, done) => {
        console.log('serializeUser() 호출!', user);
        done(null, user);
    })


    passport.deserializeUser((user, done) => {
        console.log('deserializeUser() 호출!', user);
        done(null, user);
    });

    passport.use('local-signup', local_signup);
    passport.use('local-login', local_login);
    passport.use('facebook', facebook(app, passport));
}