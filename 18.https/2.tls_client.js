/**
 * 1.生成客户端的私钥
 * openssl genrsa -out ./client/client.key 1024
 * 2.生成客户端csr
 * openssl req -new -key ./client/client.key -out ./client/client.csr
 * 3.向CA机构申请客户端证书
 * openssl x509 -req -in ./client/client.csr -signkey ./ca/ca.key  -out ./client/client.crt
 **/
var tls = require('tls');
var fs = require('fs');
var options = {
    rejectUnauthorized:true,
    key:fs.readFileSync('./client/client.key'),//服务器的私钥
    cert:fs.readFileSync('./client/client.crt'),//服务器的证书
    ca:fs.readFileSync('./ca/ca.crt')//指定合法的证书办法机构
}
var client = tls.connect(8080,'localhost',options,function(){
    console.log('connected');
    client.write('hello');
});
client.on('data',function(data){
    console.log(client);
});
client.on('end',function(){
    client.close();
});
/*
client.on('error',function(err){
    console.error(err);
});*/
