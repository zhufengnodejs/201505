var Writable = require('stream').Writable;
var util = require('util');
util.inherits(ConsoleWriteStream,Writable);

function ConsoleWriteStream(){
    Writable.call(this);
}
/**
 * _write 真正写入的方法
 * @param data 要被写入的数据块 buffer string
 * @param encoding 编码
 * @param callback 写入之后之一个回调
 * @private
 * 所有的写入流必须提供这样一个方法
 */
ConsoleWriteStream.prototype._write = function(data,encoding,callback){
    console.log(data.toString());
    callback();
}

var ws = new ConsoleWriteStream();
ws.write('珠峰','utf8',function(){
    console.log('珠峰写入成功');
    ws.write('培训','utf8',function(){
        console.log('培训写入成功');
    });
});