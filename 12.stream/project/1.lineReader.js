var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
util.inherits(LineReader,EventEmitter);
var RETURN = 0x0d;//回车 ascii \r 13
var NEWLINE = 0x0a;//换行 ascii \n 10
/**
 *1.发射事件
 * @param path
 */
function LineReader(path){
    EventEmitter.call(this);
    this.on('newListener',function(ev, fn){
        if(ev =='newLine'){
            var line = [];
            var self = this;
            this._rs.on('readable',function(){
                var buff;
                while(null != (buff = this.read(1))){
                    if(buff[0] == RETURN){// \r\n
                        this.read(1);
                        self.emit('newLine',Buffer.concat(line).toString());
                        line = [];
                    }else{
                        line.push(buff);
                    }
                }
            });
            this._rs.on('end',function(){
                self.emit('newLine',Buffer.concat(line).toString());
                self.emit('end');
            });
        }
    });

}
//当有新的 newListener

var reader = new LineReader();
reader._rs = fs.createReadStream('./pwd.txt');
reader.on('newLine',function(data){
    console.log(data);
});

reader.on('end',function(){
    console.log('end');
});