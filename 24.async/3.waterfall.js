/**
 * async 是流程控制库。
 * npm install async
 *
 **/
var async = require('async');
console.time('start');
async.waterfall([
    function(cb){
        cb(null,'水');
    },function(data,cb){
        cb(null,data+'+咖啡');
    }
],function(err,result){
    console.log(result);
});