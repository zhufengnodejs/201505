/**
 * 如何实现手工配置
 * 实现一个路由，然后程序根据路由来进行跳转
 *
 */
var url = require('url');
var http = require('http');
function add(req,res){
    res.end('add');
}
//路由映射
var routes = [];
function use(path,action){
    routes.push([path,action]);
}
use('/user/add',add);
use('/add/user',add);
use('/user/add/zhangsan/6',add);
http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname;
  for(var i=0;i<routes.length;i++){
      var route = routes[i];
      if(pathname == route[0]){
          var action = route[1];
          action(req,res);
          return;
      }
  }
    res.end('404');
}).listen(8080);