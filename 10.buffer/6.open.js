/**
 * 如何从指定的位置开始读取文件
 * 0 stdin 标准输入
 * 1 stdout 标准输出
 * 2 stderr 错误输出
 **/
var fs = require('fs');
//fd 是打开文件的索引
fs.open('./msg.txt','r',function(err,fd){
    console.log(fd);
});
/*
 * 读取文件 可以多次读取，每次读一小部分
 * fd 文件描述符
 * buffer 读到哪个buffer里
 * offset buffer偏移量
 * length 写多少个字节
 * position 从文件的哪个位置开始读
 * callback
 */
fs.open('./msg.txt','r',function(err,fd){
    var buffer = new Buffer(9);
    fs.read(fd,buffer,0,6,3,function(err,bytesRead,buf){
        console.log(bytesRead);
        console.log(buffer.toString());
        fs.read(fd,buffer,6,3,9,function(err,bytesRead,buf){
            console.log(bytesRead);
            console.log(buffer.toString());
        })
    });
});

