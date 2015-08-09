var fs = require('fs');
var buff = new Buffer(100);
buff.fill(1);
console.log(buff);
fs.writeFile('./tcp.txt',buff);