Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,sourceEnd){
    var _this=this;
    for(var i=sourceStart;i<sourceEnd;i++){
        targetBuffer[targetStart]=_this[i];
        targetStart++;
    }
}


var srcBuf = new Buffer([4,5,6]);
var tarBuf = new Buffer(6);
tarBuf[0] = 1;
tarBuf[1] = 2;
tarBuf[2] = 3;
/**
 * targetBuffer 目标buffer
 * targetStart 目标的起始位置
 * sourceStart 源的起始位置
 * sourceEnd 源的结束位置
 */
srcBuf.copy(tarBuf,3,0,3);
console.log(tarBuf);