/**
 * 最流行的快速开发框架
 * 静态文件服务 中间件 路由控制 模板
 * 1. 安装
 * npm install express
 * 2.
 **/
var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.send('/');
});

app.get('/us/:username',function(req,res){
    console.log(req.query);
    console.log(req.params.username);
    res.setHeader('Content-Type','text/html;charset=utf8');
    //res.send('关于我们');
    //res.send(404);
    //res.send({name:'zfpx'});
    //res.json({name:'zfpx'});
    res.send([1,2,3]);
});
app.all('*',function(req,res){
    res.send('404');
});
app.listen(8080);

