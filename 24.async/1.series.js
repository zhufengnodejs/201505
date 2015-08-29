/**
 * async 是流程控制库。
 * npm install async
 *
 **/
var async = require('async');
/*setTimeout(function(){
    console.log('a');
    setTimeout(function(){
        console.log('b');
    },1000)
},1000)*/
async.series({
    watchTv:function(callback){
        callback(null,'看完电视了');
    },
    writeHomeWork:function(callback){
        callback(null,'做完作业');
    }
},function(err,result){
    console.log(result);
});

series([
    function(callback){
        callback(null,'看完电视了');
    },
    function(callback){
        callback(null,'做完作业');
    }
],function(err,result){
    console.log(result);
});

function series(funList,callback){
  var index =0;
  var results = [];
  function next(){
      if(arguments[1]){
          results.push(arguments[1]);
      }
      if(index == funList.length){
          return callback(null,results);
      }else{
          funList[index++](next);
      }

  }
  next();
}