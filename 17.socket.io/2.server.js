var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
var serveStatic = require('serve-static');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(serveStatic(path.join(__dirname,'public')));
app.get('/',function(req,res){
   fs.createReadStream('./2.index.html').pipe(res);
});
var users = {};
io.on('connection',function(socket){
   var username;
   socket.send({user:'SYSTEM',content:'请输入呢称'});
   socket.on('disconnect',function(){
      console.log('用户已经断开');
   });
   //监听客户端的message事件
   socket.on('message',function(message){
      if(username){ // @zhangsan hello
         var result = message.match(/^@(.+)\s(.*)/);
         if(result){
            var toUser = result[1];
            var msg = result[2];
            if(users[toUser]){
               users[toUser].send({user:username,content:username+'对你说:'+msg});
               socket.send({user:username,content:msg});
            }else{
               socket.send({user:'SYSTEM',content:'你要私聊的不在线'});
            }
         }else{
            io.send({user:username,content:message});
         }
      }else{
         username = message;
         users[username] =socket;
         io.send({user:'SYSTEM',content:'欢迎'+username+'加入聊天室'});
      }
   });
});
server.listen(8080);