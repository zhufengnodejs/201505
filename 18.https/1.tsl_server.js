/**
 * 1.生成证书服务器的私钥
 *  openssl genrsa -out ./ca/ca.key 1024
 * 2.生成证书服务器的csr
 * openssl req -new -key ./ca/ca.key -out ./ca/ca.csr
 * 3.生成最终的证书
 *  openssl x509 -req -in ./ca/ca.csr -signkey ./ca/ca.key  -out ./ca/ca.crt
 *
 * 接下来回到服务器端，服务向CA认证机构申请签名证书
 * 1.生成服务器的私钥
 * openssl genrsa -out ./server/server.key 1024
 * 2.生成csr
 * openssl req -new -key ./server/server.key -out ./server/server.csr
 * 3.向CA机构申请证书
 * openssl x509 -req -in ./server/server.csr -signkey ./ca/ca.key  -out ./server/server.crt
 * CA认证机构将证书颁发给服务器后，服务器证书在客户端
 * 请求的过程中会发给客户端，客户端通过CA验证真假。
 *
 **/

var tls = require('tls');
var fs = require('fs');
var options = {
    requestCert:true,
    key:fs.readFileSync('./server/server.key'),//服务器的私钥
    cert:fs.readFileSync('./server/server.crt'),//服务器的证书
    ca:fs.readFileSync('./ca/ca.crt')//指定合法的证书办法机构
}

var server = tls.createServer(options,function(socket){
    socket.write('hello');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});

server.listen(8080);