module.exports = (app,fs) => {

    // http://localhost:3000  
    app.get('/',(req,res) => {
        res.render('index.ejs',{length:10});
    })
}