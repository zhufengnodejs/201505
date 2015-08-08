/**
 * 写入流的流程
 * @type {*}
 */
var fs = require('fs');
//var out  = fs.createWriteStream('./test1.txt');
/*for(var i=0;i<100000;i++){
    var flag = out.write(i.toString());//是否成功写入
   // console.log(flag);
}
out.on('drain',function(){
    console.log('缓存区中的数据全部输出');
});*/

//out.on('error',function(err){
//    console.log(err);
//});

/*out.write('123');
out.end('123');// fs.close()
out.write('456');*/
var read  = fs.createReadStream('./test1.txt');
var out  = fs.createWriteStream('./test2.txt');
/*
read.on('data',function(data){
    var flag = out.write(data);
    if(!flag){
        read.pause();
    }
});
read.on('end',function(){
    out.end();
});
out.on('drain',function(){
    read.resume();
});*/
read.pipe(out);