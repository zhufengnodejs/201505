/**
 * basic 认证是当客户端与服务器请求时，允许用户
 * 输入用户名和密码，然后在服务器做验证。
 * 成功200可以继续访问，不成功返回401(未授权)
 * 成功后，每次访问都会自动提供用户和密码
 **/
var http = require('http');
http.createServer(function(req,res){
    function send401(){
        res.setHeader('WWW-Authenticate',
            'Basic realm="Secure Area"');
        res.writeHead(401);
        res.end();
    }
    //Authorization:Basic MTox
    var auth = req.headers['authorization'];
    if(auth){
        var auths = auth.split(' ');
        var method = auths[0];
        var encoded = auths[1];
        var decoded = new Buffer(encoded,'base64').toString('utf8').split(':');
        console.log(decoded);
        if(decoded[0] ==decoded[1]){
            res.end('ok');
        }else{
            send401();
        }
    }else{
        send401();
    }
}).listen(8080);

