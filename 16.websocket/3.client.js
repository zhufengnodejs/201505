var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');
ws.on('open',function(){
    ws.send('hello world');
});
ws.on('message',function(data){
    console.log(data.toString());
});

