/**
 * 发送服务器响应
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname != '/favicon.ico'){
        //res.writeHead(200,{'Content-Type':'text/html'});
        console.log(res.headersSent);
        res.statusCode =  200;
        res.sendDate = false;//强制不发送日期字段
        res.setHeader('Content-Type','text/html');
        res.setHeader('Access-Control-Allow-Origin','http://localhost:63342');
        //res.write('hello');
        console.log(res.headersSent);
        res.removeHeader('Access-Control-Allow-Origin');
       // res.write('world');
        res.end('hello');
    }
}).listen(8080);