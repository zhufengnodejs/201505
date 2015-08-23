/**
 * 1.在处理HTTP请求的过程 ，用来完成特定任务的函数
 * 可以传递请求，也可以终止请求
 * next 表示接受下一个中间件调用，
 *
 **/
var express = require('express');
var app = express();
app.use(function(req,res,next){
    var _end = res.end;
    res.end = function(){
        console.log(req.method,' ',req.url,' ',res.statusCode,' ',res.getHeader('Content-Length'))

        _end.apply(this,Array.prototype.slice.call(arguments));
    }
    next();
});

app.use('/coffee',function(req,res,next){
    res.coffee = 'add water';
    next();
});

app.use('/coffee',function(req,res,next){
    res.coffee += 'add coffee';
    next();
});

app.use('/coffee',function(req,res,next){
    res.coffee += 'add sugar';
    next();
});
app.get('/coffee',function(req,res,next){
    res.write( res.coffee);
    next();
});

app.get('/coffee',function(req,res){
    res.end( res.coffee);
});
app.get('/water',function(req,res,next){
    res.statusCode = 200;
    res.setHeader('Content-Length','water'.length);
    res.end('water');
});

app.listen(8080);

