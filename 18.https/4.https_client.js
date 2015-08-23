var https = require('https');
var fs = require('fs');
var options = {
    hostname:'localhost',
    port:process.argv[2]||8080,
    path:'/',
    method:'GET',
    key:fs.readFileSync('./client/client.key'),//指定私钥
    cert:fs.readFileSync('./client/client.crt'),//指
    ca:fs.readFileSync('./ca/ca.crt')
}
var req = https.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        console.log(data);
    });
});
req.end();