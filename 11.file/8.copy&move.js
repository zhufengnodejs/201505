var fs = require('fs');
var BUFF_SIZE = 1024*8;
/**
 * 拷贝一个文件
 * @param src 源地址
 * @param dest 目标地址
 */
function copy(src,dest){
    var buff = new Buffer(BUFF_SIZE);//得到缓存区
    var srcFd = fs.openSync(src,'r');//得到源文件描述符
    var destFd = fs.openSync(dest,'w');///得到目标文件描述符
    var readSoFar =0;//源文件当前的读取位置
    do{
       var readedBytes =
           fs.readSync(srcFd,buff,0,BUFF_SIZE,readSoFar);
        fs.writeSync(destFd,buff,0,readedBytes,null);
        readSoFar+=readedBytes;
    }while(readedBytes == BUFF_SIZE);
    fs.closeSync(srcFd);
    fs.closeSync(destFd);
    fs.unlinkSync(src);
}
copy('msg.txt','msg2.txt');