var Duplex = require('stream').Duplex;
var util = require('util');
var fs = require('fs');
util.inherits(ChangeDuplex,Duplex);
/**
 * 要把一个原始文件加成一个加密文件
 * pwd.txt->re-pwd.txt
 * @constructor
 */
function ChangeDuplex(){
    Duplex.call(this);
}

ChangeDuplex.prototype._read = function(){

}
ChangeDuplex.prototype._write = function(data){
    for(var i=0;i<data.length;i++){
        data[i] = 255 - data[i];// 255- (255-x)=x
    }
    this.push(data);
    this.push(null);
}

var change = new ChangeDuplex();
fs.createReadStream('./re-pwd.txt').pipe(change)
    .pipe(fs.createWriteStream('./re-re-pwd.txt'))