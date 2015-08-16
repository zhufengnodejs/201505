/**
 * MVC如何实现的
 * 控制器C
 * 1.自然约定 无路由
 * 2.手工指定
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
/**
 * localhost:8080 /user/add
 * localhost:8080 /user/delete
 */
http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;//得到pathname
    var paths = pathname.split('/');// admin/user/add
    var filepath = './route';
    for(var i=1;i<paths.length;i++){
        filepath = filepath+'/'+paths[i];
        var exists = fs.existsSync(filepath);
        if(exists){
            var stat = fs.statSync(filepath);
            if(stat.isFile()){
                break;
            }
        }else{
            res.end('404');
            return;
        }
    }
    var route = require(filepath);
    console.log(route);
    var args = paths.slice(i+2);
    console.log(args);
    route[paths[i+1]].apply(null,[req,res].concat(args));
}).listen(8080);