/**
 * 最流行的快速开发框架
 * 静态文件服务 中间件 路由控制 模板
 * 1. 安装
 * npm install express
 * 2.
 **/
var express = require('express');
var app = express();
app.use(function(req,res,next){
    console.log('use1');
    if(req.username){
        next();
    }else{
        //throw Error('use');
        next();
    }
},function(req,res,next){
    console.log('use2');
    next();
});

app.get('/',function(req,res){
    res.send('/');
});

app.get('/us',function(req,res){
    res.send('us');
});
//错误处理中间件
app.use(function(err,req,res,next){
    console.error(err);
    res.end('服务出了点问题，请一会再来吧');
});
app.listen(8080);

