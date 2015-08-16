/**
 * MVC如何实现的
 * 控制器C
 * 1.自然约定 无路由
 * 2.手工指定
 */

var http = require('http');
var url = require('url');
/**
 * localhost:8080 /user/add
 * localhost:8080 /user/delete
 */
http.createServer(function(req,res){

    var handler = {
        user:{
            add:function(req,res,username,age){
                res.end('add '+username+' '+age);
            },
            delete:function(req,res,id){
                res.end('delete '+id);
            }
        }
    }
    var pathname = url.parse(req.url).pathname;//得到pathname
    var paths = pathname.split('/');
    var controller = paths[1];//得到控制器实体
    var oper = paths[2];//得到操作方法
    var args = paths.slice(3);
    if(handler[controller]&& handler[controller][oper]){
        //handler[controller][oper](req,res);
        handler[controller][oper].apply(null,[req,res].concat(args));
    }else{
        res.end('404');
    }
}).listen(8080);