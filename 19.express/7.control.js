/**
 * cookie session
 **/
var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

//var cookieSession = require('cookie-session');
var app = express();
//app.use(cookieParser());
app.use(expressSession({
    secret: 'foo',
    store: new MongoStore({ url: 'mongodb://123.57.143.189/test-app' })
}));
app.get('/login',function(req,res){
        req.session.name = '11';
        res.writeHead(200);
    req.session.age = '222';
        res.end('hello');

   // req.session.age = 6;
    //req.setHeader('Set-Cookie',"express:sess="+JSON.string({name:'zfpx'}.toString('base64')));

});

app.get('/logout',function(req,res){
    req.session.name = null;
    res.send('你还没登陆，请登陆吧');
});
app.get('/home',function(req,res){
    if(req.session.name){
        res.send(req.session.name+'欢迎你');
    }else{
        res.send('你还没登陆，请登陆吧');
    }
});

app.get('*',function(req,res){
    res.send('404');
});
app.listen(8080);

