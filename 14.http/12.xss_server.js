var http = require('http');
var url = require('url');
var parse = require('./parse');
var cookieUtils = require('./cookieUtils');
var fs = require('fs');
http.createServer(function(req,res) {
    parse(req);
    if (req.pathname =='/') {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8',
            'Set-Cookie': cookieUtils.serialize("name","zfpx")
        })
      fs.createReadStream('./index2.html').pipe(res);
    } else if(req.pathname =='/a'){
        console.log(req.url);
    }
    else {
        res.end('404');
    }

}).listen(8080);