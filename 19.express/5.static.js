/**
 * 最流行的快速开发框架
 * 静态文件服务 中间件 路由控制 模板
 * 1. 安装
 * npm install express
 * 2.
 **/
var express = require('express');
var app = express();
var serveStatic = require('serve-static');
app.use(serveStatic(__dirname));

app.listen(8080);

