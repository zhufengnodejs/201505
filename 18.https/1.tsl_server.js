/**
 * 证书机构
 * 1.生成证书服务器私钥
 *  openssl genrsa -out ./ca/ca.key 1024
 * 2.生成证书服务器csr
 *  openssl req -new -key ./ca/ca.key -out ./ca/ca.csr
 * 3.生成证书服务器证书
 * openssl x509 -req -in ./ca/ca.csr -signkey ./ca/ca.key -out ./ca/ca.crt
 * 以上完成了扮演CA角色需要的文件
 *
 * 接下来回到服务器端，服务喊叫需要向CA机构申请签名证书
 * common name要匹配服务器域名
 * 1.生成服务器私钥
 *  openssl genrsa -out ./server/server.key 1024
 * --2.生成公钥
 * --  openssl rsa -in ./server/server.key -pubout -out ./server/server.pem
 * 3.生成 csr
 * 一定要注意，common name要匹配服务器域名，请求的时候也要指定
 *  openssl req -new -key ./server/server.key -out ./server/server.csr
 * 4.生成证书 向证书申请签名,需要CA证书和私钥参与 ，最后办法一个CA签名证书
 * openssl x509 -req -CA ./ca/ca.crt -CAkey ./ca/ca.key -CAcreateserial -in ./server/server.csr  -out ./server/server.crt
 *
 * CA机构将证书发给服务器后，证书在请求过程会被发到客户端，客户端通过CA验证真假。知名预装
 * 一环一环办法，CA证书不需要上级证书签名 根证书
 */
var tls = require('tls');
var fs = require('fs');
var options = {
    key:fs.readFileSync('./server/server.key'),//指定私钥
    cert:fs.readFileSync('./server/server.crt'),//指定证书
    requestCert:false,
    ca:fs.readFileSync('./ca/ca.crt')//指定合法的证书机构
}

var server = tls.createServer(options,function(socket){
    socket.write('hello');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});
server.listen(8080,'localhost');
//   openssl s_client -connect 127.0.0.1:8080