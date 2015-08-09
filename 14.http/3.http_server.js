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
server.on('request',function(req,res){
    //   /post?name=zfpx&age=6
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname='/post'){
        req.pipe(fs.createWriteStream('./form.txt'));
        req.body = {
            username:'111',
            avatar:{
                filename:'baidu.png',
                name:"avatar",
                path:"./baidu.png"
            }
        }


    }else{
        res.end('404');
    }
});


server.listen(8080);