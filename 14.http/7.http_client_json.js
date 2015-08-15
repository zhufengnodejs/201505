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
    headers:{'Content-Type':'application/json'}
}
var req = http.request(options,function(res){
    console.log(res.statusCode);
    console.log(res.headers);
    res.on('data',function(data){
        console.log(data.toString());
    });
});
req.write('{"name":"zfpx","age":8}');
req.end();