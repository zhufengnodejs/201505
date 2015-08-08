var fs = require('fs');
/**
 * 可以完整的写入一个文件
 * fs.writeFile
 *
 **/
/*fs.writeFile('./write.txt',new Buffer('第二行'),{flag:'a',encoding:'utf8'},function(err){
    if(err){
        console.error(err);
    }
    console.log('写入成功');
})*/

fs.appendFile('./write.txt',new Buffer('第三行'),{flag:'w'});

/**
 base64
 A-Za-z0-9+/
 把3个8位字节转化为4个6位字节，之后在6位前面补两个0,形成8偿还一个字节的形式
 **/
/*fs.readFile('./baidu.png','base64',function(err,data){
    fs.writeFile('./b.png',data,'base64',function(){
        console.log('copy');
    })
})*/
//珠
var buf = new Buffer('珠');
console.log(buf);
//e7 8f a0
//00111001 00111000 00111110 00100000
//57 56 62 32
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
console.log(str[57]+str[56]+str[62]+str[32]);