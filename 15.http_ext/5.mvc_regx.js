/**
 * 如何实现手工配置
 * 实现一个路由，然后程序根据路由来进行跳转
 *
 */
var url = require('url');
var http = require('http');
function add(req,res){
    res.end('add '+req.params.username+' '+req.params.age);
}
// /user/add/:username/:age

// /user/add/zhangsan/6
function reg(path){
 var keys = [];// ['username','age']
 path = path.replace(/:(\w+)/g,function(){
     keys.push(arguments[1]);
     return '(\\w+)';
 });// /user/add/(\\w+)/(\\w+)
 return {
    keys:keys,
     regex:new RegExp('^'+path.replace(new RegExp('/','g'),'\\/')+'$')
     //  \/user\/add\/(\\w+)\/(\\w+)
 }
}

//路由映射
var routes = [];
function use(path,action){
    routes.push([reg(path),action]);
}
// /user/add/zhangsan/6 username age
use('/user/add/:username/:age',add);
http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname;
  for(var i=0;i<routes.length;i++){
      var route = routes[i];
      var reg = route[0].regex;
      var keys = route[0].keys;
      var matched = reg.exec(pathname);
      if(matched){
          var params = {};
          for(var j=0;j<keys.length;j++){
              var value = matched[j+1];
              if(value){
                  params[keys[j]] = value;
              }
          }
          req.params = params;
          var action = route[1];
          action(req,res);
          return;
      }
  }
    res.end('404');
}).listen(8080);