
var fs = require('fs');
var p = require('path');

function makeP(str){
    var arr=str.split('\\');

    for(var i=0;i<arr.length;i++){
        var currPath=process.cwd()+'\\'+arr.slice(0,i+1).join('\\');
        var exists = fs.existsSync(currPath);
        if(exists){
            var stat = fs.statSync(currPath);
            if(stat.isFile())
                 throw Error('is File');
        }else{
            fs.mkdirSync(currPath);
        }
        console.log(currPath);
    }
}

makeP('a\\b\\cf\\d');