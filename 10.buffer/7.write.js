var fs = require('fs');
/**
 * fd
 * buffer buffer
 * offset 从buffer中读取的偏移量
 * length 写入的长度
 * position 写入文件的位置
 * callback
 */
/*fs.open('./msg.txt','w',function(err,fd){
   fs.write(fd,new Buffer('珠峰培训'),3,6,0,function(err,bytesWritten,buff){
       console.log('写入成功,写入了'+bytesWritten);
   })
});
//position null 当前位置
fs.open('./msg.txt','w',function(err,fd){
    fs.write(fd,new Buffer('珠峰培训'),0,6,null,function(err,bytesWritten,buff){
        console.log('写入成功,写入了'+bytesWritten);
        fs.write(fd,new Buffer('珠峰培训'),6,6,null,function(err,bytesWritten,buff){
            console.log('写入成功,写入了'+bytesWritten);
        })
    })
});*/
/**
 * 写入文件之后，要关闭文件
 *
 **/
fs.open('./msg.txt','xw',function(err,fd){
   if(err)
    console.log(err);
    console.log(fd);
    fs.write(fd,new Buffer('珠峰培训'),0,6,null);
    fs.fsync(fd);//把缓存区里的数据立刻马上迅速同步到目标文件里去
    fs.close(fd);
});
setTimeout(function(){
    fs.open('./msg.txt','w',function(err,fd){
        if(err)
            console.log(err);
        console.log(fd);
    });
},5000)
