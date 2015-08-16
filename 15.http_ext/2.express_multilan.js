var express = require('express');

/**
 * 如何在node中实现多语言
 * 通过 来检测浏览器的语言
 * Accept-Language: en,zh-CN;q=0.8,zh;q=0.6
 *
 */
var serverStatic = require('serve-static');
var url = require('url');
var fs = require('fs');
var app = express();

/**
 * 选择合适的语言
 * 客户端需要哪些语言
 * 服务器有哪些语言
 */
function checkLanguage(lans){
  var defaultLan = lans[0].toLowerCase();
  return function(req,res,next){
    var acceptLans = req.headers['accept-language'];
     var orderedLans = [];
      if(acceptLans)
      acceptLans.split(',').forEach(function(lan){
          orderedLans.push(lan.split(';')[0]);
      })
      for(var i=0;i<orderedLans.length;i++){
          if(lans.indexOf(orderedLans[i])!=-1){
              req.selectedLan = orderedLans[i];
              next();
              return;
          }
      }
      req.selectedLan = defaultLan;
      next();
  }
}
//使用语言中间件并指定可以提供的语言版本
app.use(checkLanguage(['zh-cn','en']));//检测浏览器语言
app.get('/',function(req,res){
    res.writeHead(200,{'ContentType':'text/html;charset=utf8'})
    fs.createReadStream('./lan/'+req.selectedLan+'/index.html').pipe(res);
});
// /etc/hosts
// C:\Windows\System32\drivers\etc\hosts
app.listen(8080,'localhost');