/**
 * HTTP 超文本传输协议
 * 资源是通过 URL来标识
 * 请求和响应由报文组成
 **/

var http = require('http');
var server = http.createServer();
var url = require('url');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');
server.on('request',function(req,res){
    //   /post?name=zfpx&age=6
    var urlObj = url.parse(req.url,false);
    var pathname = urlObj.pathname;
    //req.setEncoding('utf8');
    if(pathname == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname == '/get'){
        // /get?username=zfxp&email=zfpx%40126.com
        var obj = querystring.parse(urlObj.query);
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.end(JSON.stringify(obj));
    } else if(pathname == '/post'){
        var rawBody = [];
        req.on('data',function(chunk){
            rawBody.push(chunk);
        });
        req.on('end',function(){
            var obj = {};
            var contentType = req.headers['content-type'];
            if(contentType == 'application/json'){
                 obj = JSON.parse(Buffer.concat(rawBody).toString());
            }else if(contentType == 'application/xml'){
                var xml2js = require('xml2js');
                xml2js.parseString(rawBody,function(err,res){
                     obj = res;
                });
            }
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            res.end(JSON.stringify(obj));
        });
    }else{
        res.end('404');
    }
});


server.listen(8080);