/**
 * HTTP 超文本传输协议
 * 资源是通过 URL来标识
 * 请求和响应由报文组成
 **/

var http = require('http');
var server = http.createServer();
var url = require('url');
var util = require('util');
server.on('request',function(req,res){
    ///?name=zfpx&age=6
    console.log(req.method);
    console.log(req.httpVersion);
    var headers = req.headers;
    var urlObject = url.parse(req.url,true);
    console.log('request');
    //设置header
    res.setHeader('name','zfpx');
    res.setHeader('age',7);
    res.statusCode = 200;
    //res.end(util.inspect(urlObject.query));
    //res.end(JSON.stringify(urlObject.query));
    res.end(JSON.stringify(headers));
});
server.on('connection',function(){
    console.log('connect');
});
server.on('error',function(e){
    console.log(e);
});

server.listen(8080);