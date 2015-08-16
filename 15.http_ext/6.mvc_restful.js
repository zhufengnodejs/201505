/**
 * restful 表现层状态转化
 * 将服务器提供的实体当作一个资源，并表现在URL上
 * /user/zfpx
 * /user/add/zfpx 增加
 * /user/delete/zfpx 删除
 *
 * restful是将方法引入到设计 中，参与资源的状态变化
 * POST /usr/zfpx 增加
 * DELETE /usr/zfpx 删除
 * PUT /usr/zfpx 修改
 * GET /usr/zfpx 获取查询
 * restful只是将HTTP的请求就去加入到路由里
 */
var url = require('url');
var http = require('http');
function add(req,res){
    res.end('add'+req.params.username);
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
    console.log(result);
    return result;
}

//路由映射
var app = {allRoutes:[]};
var routes = [];
//针对所有的方法生效
app.use = function(path,action){
    app.allRoutes.push([reg(path),action]);
}
var methods = ['post','delete','put','get'];
methods.forEach(function(method){
    app[method+'Routes'] = [];
    app[method] = function(path,action){
        app[method+'Routes'].push([reg(path),action]);
    }
});
app.use('/user/:username',all);
app.post('/user/:username',add);
app.delete('/user/:username',del);
app.put('/user/:username',put);
app.get('/user/:username',get);

http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname;
  var method = req.method.toLowerCase();
  if(app.hasOwnProperty(method)){
      var routes = app[method+'Routes'];
  }else{
      var routes = app['allRoutes'];
  }
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