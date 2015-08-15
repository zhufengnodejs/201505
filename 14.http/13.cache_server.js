/**
 * 缓存 把最常用的东西缓存起来，加快加载速度
 * expire 设置一个键为Expires header值
 *  是一个GMT格式的字符串，浏览器接收到此值后，只要本地有这个文件，到期之间不发请求
 * max-age 多长时间之后过期
 * Cache-Control 会覆盖expires的设置
 */
var fs= require('fs');
var http = require('http');
var crypto = require('crypto')
function getHash(content){
    return crypto.createHash('sha1').update(content).digest('hex');
}

function expireHandler(filename,req,res){
   fs.readFile(filename,function(err,content){
       var expires = new Date(new Date().getTime()+ 30*1000);
       res.setHeader('Expires',expires.toUTCString());//http1.0
       res.setHeader('Cache-Control','max-age=60');// http1.1
       res.writeHead(200,"OK");
       res.end(content);
   })
}

/**
 * 1.第一次响应的时候，服务器返回客户端一个Last-Modified header,最后修改时间
 * 2.当客户端再次需要请求该 文件的时候，会把这个时间发给服务器，if-modified-since
 * 3.服务器判断，如果修改过返回最新数据，如果没修改过返回304
 */
function matchHandler(filename,req,res){
    var lastModified = new Date(req.headers['if-modified-since']);
    fs.stat(filename,function(err,stat){
        if(err)
            throw Error(err);
        if(Math.floor(stat.mtime.getTime()/1000) == Math.floor(lastModified.getTime()/1000)){
            res.statusCode = 304;
            res.end('');
        }else{
            res.setHeader('Last-Modified',stat.mtime.toGMTString());
            res.writeHead(200,"OK");
            fs.createReadStream(filename).pipe(res);
        }
    });
}
/**
 * 1. 只能精确到秒 不够精确
 * 2. 修改时间改了，内容不一定改
 * etag
 * 1.第一次的时候，服务器会把此文件生成etag,发给客户端 ETag
 * 2.再次请求的时候，客户端把 这tag传回来。 if-none-match
 * 3.服务器进行判断，相同则返回304，不相同返回最新文件
 *
 */
function etagHandler(filename,req,res){
    fs.readFile(filename,function(err,content){
        var hash = getHash(content);
        var match = req.headers['if-none-match'];
        console.log(hash,match);
        if(hash == match){
            res.statusCode = 304;
            res.end('');
        }else{
            res.setHeader('ETag',hash);
            res.writeHead(200,"OK");
            fs.createReadStream(filename).pipe(res);
        }
    })
};

http.createServer(function(req,res){
    //console.log(req.url);
    //console.log(req.headers['if-modified-since']);
    if(req.url == '/favicon.ico'){
        return res.end('404');
    }
    // /1.txt
    var filename = req.url.slice(1);
    //expireHandler(filename,req,res);
    //matchHandler(filename,req,res);
    etagHandler(filename,req,res);
}).listen(8080);