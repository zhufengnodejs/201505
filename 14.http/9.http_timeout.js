/**
 * timeout
 * 超时
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname != '/favicon.ico'){
      res.setTimeout(1000);
        console.log('no method');
        //nomethod();
        //如果没有监听 此事件，那么客户端得不到响应，直接报错
        //如果监听了此事件，客户端不报错
     /* res.on('timeout',function(){
            console.log('响应超时');
      });*/
        setTimeout(function(){
            res.end('zfpx');
        },5000)
    }
}).listen(8080);

server.on('error',function(err){
    console.log(err);
});
process.on('uncaughtException',function(err){
    console.log(err);
});