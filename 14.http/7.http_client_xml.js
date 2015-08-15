/**
 * 请求网站的数据
 *
 **/

var http = require('http');
var options = {
    host:'localhost',
    port:8080,
    method:'POST',
    path:'/post',
    headers:{'Content-Type':'application/xml'}
}
var req = http.request(options,function(res){
    console.log(res.statusCode);
    console.log(res.headers);
    res.on('data',function(data){
        console.log(data.toString());
    });
});
req.write('<root><name>zpfx</name></root>');
req.end();