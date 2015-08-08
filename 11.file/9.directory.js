/**
 * fs
 */
var fs = require('fs');
/*fs.mkdir('./a/a.txt',function(err){
    if(err)
        console.log(err);
    else
        console.log('创建成功');
});*/

//2.读取一个目录
fs.readdir('a',function(err,files){
    if(err)
        console.error(err);
    else{
        console.log(files);
    }
})

/**
 查看文件或目录的信息
 size
 atime 最后访问时间
 mtime 最后修改时间
 ctime 创建时间
 birthtime 出生时间
 */
fs.stat('a',function(err,stat){
    console.log(stat.isFile());
    console.log(stat.isDirectory());
    console.log(stat.size);
})
//判断一个文件或目录 是否存在
fs.exists('a',function(exists){
    console.log(exists);
});
//从相对路径得到绝对路径
fs.realpath('a',function(err,path){
    console.log('a',path);
});

var path = require('path');
console.log('path ',path.resolve('a'));

//修改目录的信息
fs.utimes('./msg.txt',new Date(),new Date(),function(){

})
//修改权限
fs.chmod('./msg.txt',0600,function(){

});

fs.rename('msg.txt','msg2.txt',function(){

});

var currPath = 'msg2.txt';
fs.stat(currPath,function(err,stat){
    console.log('before',stat.size);
    fs.truncate(currPath,3,function(){
        fs.stat(currPath,function(err,stat){
            console.log('after',stat.size);
        });
    });
});
//删除一个目录
fs.rmdir('a/a.txt');
//级连创建目录
fs.prototype.makeP= function(){

}
//级连删除目录
fs.prototype.rmdirR= function(){

}