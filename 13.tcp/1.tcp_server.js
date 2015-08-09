/**
 * TCP
 **/
var net = require('net');
var util = require('util');
var fs = require('fs');
var server = net.createServer();
server.on('connection', function(socket){
    //console.log(socket);
    console.log('connected');
    socket.setEncoding('utf8');
    socket.on('data',function(chunk){
        console.log(chunk);
        socket.write("server:"+chunk);
    });
});
server.listen(8080);