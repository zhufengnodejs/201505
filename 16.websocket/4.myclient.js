var url = require('url');
var http = require('http');
var crypto = require('crypto');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(WebSocket,EventEmitter);
function shaKey(key){
    var shasum = crypto.createHash('sha1');
    shasum.update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
    return  shasum.digest('base64');
}
function WebSocket(address){//'ws://localhost:8080'
    var self = this;
    var serverUrl = url.parse(address);
    var key = new Buffer(('-'+Date.now()).toString('base64'));
    var expKey = shaKey(key);
    var requestOptions = {
        host:serverUrl.hostname,
        port:serverUrl.port,
        headers:{
            Connection: "Upgrade",
            Upgrade: "websocket",
            "Sec-WebSocket-Version": 13,
            "Host":serverUrl.host,
            "Sec-WebSocket-Key":key
        }
    }
    var req = http.request(requestOptions);
    req.on('upgrade',function(res,socket,upgradeHead){
        self.socket = socket;
        socket.setEncoding('utf8');
        var serverkey = res.headers['sec-websocket-accept'];
        if(expKey == serverkey){
            self.emit('open');
        }
        socket.on('data',function(data){
            self.emit('message',data);
        })
    });
    req.end();//真正发起http请求
}

WebSocket.prototype.send = function(data){
    this.socket.write(data);
}

var ws = new WebSocket('ws://localhost:8080');
ws.on('open',function(){
    console.log('opened');
   ws.send('你好服务器');
});
ws.on('message',function(data){
    console.log(data);
});

