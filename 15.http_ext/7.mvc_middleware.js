/**
 *在真正业务处理之前有可能有一些公用的逻辑
 *  比如 读取pathname，读取querystring取查询字符串 校验用户是否登陆
 *
 */
var url = require('url');
var http = require('http');
function query(req,res,next){
    console.log('query');
    var query = url.parse(req.url,true).query;
    req.query = query;
    next();
}
function auth(req,res,next){
    console.log('auth');
    var pathname = url.parse(req.url,true).pathname;
    req.pathname = pathname;
    if(pathname =='/private'){
      res.end('no auth');
    }else{
        next();
    }
}
function add(req,res){
    res.end('add'+req.query+req.params.username);
}
function del(req,res){
    res.end('del'+req.params.username);
}
function put(req,res){
    res.end('put'+req.params.username);
}
function get(req,res){
    res.end('get '+req.params.username);
}
function all(req,res){
    res.end('all'+req.params.username);
}
// /user/add/:username/:age(\d+)

// /user/add/zhangsan/6
var DEFAULT_REPLACEMENT = '(\\w+)';
function reg(path){
 var keys = [];// ['username','age']
 path = path.replace(/:([^\s/]+)/g,function(){
     var matched = arguments[1];
     if(matched.lastIndexOf('(')==-1){
         keys.push(arguments[1]);
         return DEFAULT_REPLACEMENT;
     }else{
         keys.push(matched.slice(0,matched.lastIndexOf('(')));
         return matched.slice(matched.lastIndexOf('('),matched.lastIndexOf(')')+1);
     }

 });// /user/add/(\\w+)/(\\w+)
 var result =  {
    keys:keys,
     regex:new RegExp('^'+path.replace(new RegExp('/','g'),'\\/')+'$')
     //  \/user\/add\/(\\w+)\/(\\w+)
 }
    return result;
}

//路由映射
var app = {allRoutes:[]};
var routes = [];
//针对所有的方法生效
app.use = function(path,action){
    var handler = {
        path:reg(path),
        stack:Array.prototype.slice.call(arguments,1)
    }
    app.allRoutes.push(handler);
}
var methods = ['post','delete','put','get'];
methods.forEach(function(method){
    app[method+'Routes'] = [];
    app[method] = function(path,action){
        var handler = {
            path:reg(path),
            stack:Array.prototype.slice.call(arguments,1)
        }
        app[method+'Routes'].push(handler);
    }
});
app.use('/user/:username',auth,query,all);
app.post('/user/:username',query,add);
app.delete('/user/:username',query,del);
app.put('/user/:username',query,put);
app.get('/user/:username',auth,query,get);
app.get('/private',auth,query,get);
http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname;
  var method = req.method.toLowerCase();
  if(app.hasOwnProperty(method)){
      var routes = app[method+'Routes'];
  }else{
      var routes = app['allRoutes'];
  }
    for(var i=0;i<routes.length;i++){
        var handler = routes[i];
        var reg = handler.path.regex;
        var keys = handler.path.keys;
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
            handle(req,res,handler.stack)
            return;
        }
    }
    res.end('404');
    function handle(req,res,stack){
        var next = function(){
            var middle = stack.shift();
            if(middle){
                middle(req,res,next);
            }
        }
        next();
    }
}).listen(8080);