var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port:8080});
//客户端连接上服务器之后触发的事件
wss.on('connection',function(ws){
    //服务器监听客户端的消息
    ws.on('message',function(message){
        console.log('received:%s',message);
        //服务器向客户端发消息
        ws.send('server hello');
    });
   /* ws.on('error',function(err){
        console.log(err);
    });*/
});

wss.on('error',function(err){
    console.log(err);
});