var express = require('express');
//静态资源中间件
/**
 * 如何处理图片防盗链
 * HTTP Referer 是header 一部分。
 * 当浏览器发向服务器发请求的时候，会带上referer
 * 告诉服务器我从哪个页面来
 *
 * 可以通过检查请求头referer 来判断网站的域名
 * 如果来源不受信任，报错
 *
 *
 */
var serverStatic = require('serve-static');
var url = require('url');
var fs = require('fs');
var app = express();
// /img/baidu.png
//  referer: 'http://localhost:63342/201505/15.http_ext/refer.html',
app.use(function(req,res,next){
    console.log('referer',req.url,req.headers.referer);
    next();
});
function checkRefer(whiteList){
    return function(req,res,next){
        var referer = req.headers.referer;
        if(!referer) return next();
        var host = url.parse(referer,true).host;
        host = host.split(':')[0];
        if(whiteList.indexOf(host)!=-1){
            next();
        }else{
            res.sendfile('./img/no.png');
        }
    }
}
app.use(checkRefer(['a.zfpx.cn']));//白名单
app.use('/img',serverStatic(__dirname+'/img'));
app.get('/',function(req,res){

    fs.createReadStream('./refer.html').pipe(res);
});
// /etc/hosts
// C:\Windows\System32\drivers\etc\hosts
app.listen(8080,'localhost');