var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var config = require('./config');
var zlib = require('zlib');
//Accept-Encoding:gzip, deflate, sdch
var server = http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if(pathname == '/favicon.ico')return res.end('404');
    if(pathname.slice(-1) == '/'){
        pathname+='index.html';
    }
    var realPath = path.join('public',pathname);
    var ext = path.extname(realPath);
    if(ext.match(config.CachedType.fileMatch)){
        fs.stat(realPath,function(err,stat){
            var lastModified = stat.mtime.toUTCString();
            if(req.headers['if-modified-since'] && req.headers['if-modified-since'] == lastModified){
                res.writeHead(304);
                return res.end(http.STATUS_CODES[304]);
            }else{
                var expires = new Date(new Date().getTime()+config.CachedType.maxAge*1000);
                res.setHeader('Expires',expires.toUTCString());
                res.setHeader('Cache-Control','max-age='+config.CachedType.maxAge);
                res.setHeader('Last-Modified',lastModified);

                var raw = fs.createReadStream(realPath);
                var acceptEncoding = req.headers['accept-encoding'];
                var matched = ext.match(config.Compress.match);
                console.log('matched',matched)
                if(matched){
                    //gzip, deflate, sdch
                    if(acceptEncoding.match(/\bgzip\b/)){
                        res.writeHead(200,'OK',{'Content-Encoding':'gzip','Content-Type':mime.lookup(realPath)});
                        raw.pipe(zlib.createGzip()).pipe(res);
                    }else{
                        res.writeHead(200,'OK',{'Content-Type':mime.lookup(realPath)});
                        raw.pipe(res);
                    }
                }
            }
        })
    }else{
        res.writeHead(200,{'Content-Type':mime.lookup(realPath)})
        fs.createReadStream(realPath).pipe(res);
    }
}).listen(8080);