var fs = require('fs');

var rs = fs.createReadStream('msg.txt',{highWaterMark: 32 * 1024});
rs.on('readable',function(){
    console.log('------------readable-------------');
    var data;
    while(null != (data = rs.read())){

    }
});
rs.on('end',function(){
    console.log('end');
});