var express = require('express');
var httpProxy = require('http-proxy');
var forwarded = require('forwarded');
var url = require('url');
var fs = require('fs');
var app = express();
/**
 * 通过host实现多个网站共用一个端口
 * 通过请求头中的host来区分不同的主机
 * 127.0.0.1 zfpx.baidu.com
 * 127.0.0.1 zfpx.taobao.com
 * 127.0.0.1 zfpx.qq.com
 * host 当前访问的域名
 * target 目标域名
 */
function proxyPass(host,target){
 var targetHost = url.parse(target).host;
 var proxy = httpProxy.createProxyServer();
 proxy.on('proxyReq',function(proxyReq,req,res,options){
        proxyReq.setHeader('Host',targetHost);
        proxyReq.setHeader('X-Real-IP',forwarded(req));
 });
 proxy.on('proxyRes',function(proxyRes,req,res){
     res.setHeader('X-Proxy-By','node.js');
 });
 return function(req,res,next){
     var currHost = req.headers.host.split(':')[0];
     if(currHost == host){
         proxy.web(req,res,{
             target:target
         });
     }else{
         next();
     }
 }
}
app.use(proxyPass('zfpx.baidu.com','http://www.baidu.com'));
app.use(proxyPass('zfpx.taobao.com','http://www.taobao.com'));
app.use(proxyPass('zfpx.qq.com','http://www.qq.com'));
app.listen(80,'localhost');