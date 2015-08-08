
var fs = require('fs');
/**
 * 监视文件或目录
 * curr fs.Stat
 * prev fs.Stat
 **/

var func1 = function(curr,prev){
   // console.log(curr,prev);
    if(Date.parse(prev.ctime)==0){
        console.log('文件刚刚创建');
    }else if(Date.parse(curr.ctime)==0){
        console.log('文件刚刚删除');
    }else{
        console.log('文件修改');
    }
}

fs.watchFile('cucumber.txt',{interval:0},func1);
setTimeout(function(){
    fs.unwatchFile('cucumber.txt',func1);
},4000);