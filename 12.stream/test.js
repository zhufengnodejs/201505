var fs = require('fs');
fs.writeFileSync('msg.txt',new Buffer(128*1024));