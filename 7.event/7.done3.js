var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var user = {};
var count =0;
var e = new EventEmitter();
e.on('name',done);
e.on('age',done);

var done = function(key,value){
    user[key] = value;
    if(++count==2)
        console.dir(user);
}
fs.readFile('./name.txt','utf8',function(err,data){
    e.emit('name',data);
});
fs.readFile('./age.txt','utf8',function(err,data){
    e.emit('age',data);
});

