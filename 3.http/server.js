var  http = require('http');
var fs = require('fs');
//创建一个http服务器         请求 响应
http.createServer(function(req,res){
    var url = req.url;
    var urls = url.split('?');
    var pathname = urls[0];
    var query = urls[1];
    if(pathname == '/index.html'){
        var content = fs.readFileSync('./index.html');
        res.end(content);
    }else{
        res.end("404");
    }


}).listen(80);//在8080监听
