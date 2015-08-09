var Transform = require('stream').Transform;
var util = require('util');
var fs = require('fs');
util.inherits(ChangeDuplex,Transform);
/**
 * 要把一个原始文件加成一个加密文件
 * pwd.txt->re-pwd.txt
 * @constructor
 */
function ChangeDuplex(){
    Transform.call(this);
}


ChangeDuplex.prototype._transform = function(data){
    for(var i=0;i<data.length;i++){
        data[i] = 255 - data[i];// 255- (255-x)=x
    }
    this.push(data);
    this.push(null);
}

var change = new ChangeDuplex();
fs.createReadStream('./pwd.txt').pipe(change)
    .pipe(fs.createWriteStream('./re-pwd.txt'))