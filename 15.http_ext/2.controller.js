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
        admin:{
            user:{
                add:function(req,res,username,age){
                    res.end('add '+username+' '+age);
                },
                delete:function(req,res,id){
                    res.end('delete '+id);
                }
            }
        }

    }
    var pathname = url.parse(req.url).pathname;//得到pathname
    var paths = pathname.split('/');// admin/user/add
    var finalhandler = handler;//最终的处理函数
    for(var i=1;i<paths.length;i++){
        if(finalhandler[paths[i]]){ //admin
            finalhandler = finalhandler[paths[i]];
            if(typeof finalhandler == 'function')
                break;
        }else{
            res.end('404');
            return;
        }
    }
    var args = paths.slice(i+1);
    if(typeof finalhandler == 'function')
        finalhandler.apply(null,[req,res].concat(args));
    else
        res.end('404');
}).listen(8080);