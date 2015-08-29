var http = require('http');
http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end('hellp zfpx');
}).listen(8080);
