var Readable = require('stream').Readable;
var util = require('util');
util.inherits(Counter,Readable);
/**
 * 能从流里读取数据，读取的次数可定义
 * @param opt
 * @constructor
 */
function Counter(opt){
    Readable.call(this);
    this._start = opt.start;//1
    this._end = opt.end;//10
}
/**
 * 这是一个readable子类，从1至10递增的触发数字，然后结束
 * readable子类都必须提供一个_read方法用来抓取数据
 * readable工作原理：将数据读入一个队列，当readable事件发生时，用read方法，数据从队列里取出
 * push null表示结束 触发EOF
 * @private
 */
Counter.prototype._read = function(){
    if(this._start>this._end){
        this.push(null);//null 意味着流读取结束 触发end事件
    }else{
        this.push(new Buffer(this._start+""));
    }
    this._start++;
}

var counter = new Counter({start:1,end:10});
counter.setEncoding('utf8');
counter.on('data',function(data){
    console.log(data);
}).on('end',function(){
    console.log('end');
});