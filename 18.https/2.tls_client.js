/**
 * 1. 创建私钥
 *  openssl genrsa -out ./client/client.key 1024
 *  2.生成csr
 *  openssl req -new -key ./client/client.key -out ./client/client.csr
 *  3.生成签名证书
 *  openssl x509 -req -CA ./ca/ca.crt -CAkey ./ca/ca.key -CAcreateserial -in ./client/client.csr  -out ./client/client.crt
 **/

var tls = require('tls');
var fs = require('fs');
var options = {
    key:fs.readFileSync('./client/client.key'),
    cert:fs.readFileSync('./client/client.crt'),
    ca:fs.readFileSync('./ca/ca.crt')//,
    //rejectUnauthorized:false //不加会报错
}
// 一定要注意，common name要匹配服务器域名，请求的时候也要指定
var client = tls.connect(8080,'localhost',options,function(){
    console.log('connected');
    client.write('hello');
});
client.setEncoding('utf8');
client.on('data',function(data){
    console.log(data);
});
client.on('end',function(){
    client.close();
});
client.on('error',function(err){
    console.error(err);
});