/**
 * async 是流程控制库。
 * npm install async
 *
 **/
var async = require('async');
console.time('start');
async.auto({
    mixFlour:['getWater','getFlour',function(cb,result){
        cb(null,result.getWater+result.getFlour+'mixFlour');
    }],
    steam:['mixFlour',function(cb,results){
        cb(null,results.mixFlour+'steam');
    }],    getWater:function(cb){
        cb(null,'water');
    },
    getFlour:function(cb){
        cb(null,'flour');
    },
},function(err,result){
    console.log(result);
})