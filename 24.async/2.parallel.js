/**
 * async 是流程控制库。
 * npm install async
 *
 **/
var async = require('async');
console.time('start');
async.parallel([function (callback) {
    setTimeout(function(){
        callback(null,'one');
    },2000)
},
    function (callback) {
        setTimeout(function(){
            callback(null,'two');
    },2000);

    }], function (err, result) {
    console.timeEnd('start');
    console.log(result);
});