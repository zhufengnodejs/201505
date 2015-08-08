/**
 * 1. readFile readFileWrite 文件作为整体
 * 2. read 一小块一小块读取
 * 3. 有些时候我们不知道大小，而且也也不关心大小。
 * 只关心何时读到数据以及如何，何时结束。
 * 4.流是一组有序的，有起点和终点的字节传输手段
 * 5.我们使用stream.Readable 接口的对象来将对象转成流数据
 * 6.常用的可读流
 *   fs.ReadStream 读取文件流
 *   http.IncomingMessage 客户端请求对象
 *   net.Socket TCP客户端
 *   gzip deflat 数据压缩流
 *  7.
 *
 */
var fs = require('fs');
/**
 * ReadStream<Readable<Stream
 * path 文件路径
 * options 选项
 *  fd 文件索引
 *  flags 打开方式
 *  mode
 *  start 文件的起始位置
 *  end 文件的结束位置
 *  autoClose  是否自动关闭
 *  , {start:3,end:8}
 */
/**
 * 读取流分为二种读取模式
 * 流动模式 迫使操作系统尽快读出数据，
 * 非流动模式  需要通过代码去读取
  */
var rs = fs.createReadStream('msg.txt');//包括end
//当文件打开时触发
rs.on('open',function(){
    console.log('opened:');
});
rs.resume();
setTimeout(function(){
    rs.on('data',function(data){
        console.log('data:');
    });
},5000);
//rs.pause();
/*setTimeout(function(){
    rs.resume();
},5000);*/
//读到数据时触发
/*rs.on('data',function(data){
    console.log('data:');
});*/
//当读以文件末尾时触发
rs.on('end',function(data){
    console.log('end:');
});
//当文件关闭的时候触发
rs.on('close',function(data){
    console.log('close:');
});
console.log('exec');