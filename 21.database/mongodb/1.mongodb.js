
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://123.57.143.189/zfpx05',function(err,db){
  console.log('连接mongodb数据库成功');
  /* db.collection('person').save({name:'zfpx100',age:100},function(err,result){
       console.log(result.result);
       db.close();
   });*/
    //多条插入
    /*db.collection('person').insert([{name:'zfpx200',age:200},{name:'zfpx300',age:300}],function(err,result){
        console.log(result.result);
        db.close();
    });*/
    //分页查询
    db.collection('person').find({}).skip(5).limit(5).sort({name:1}).toArray(function(err,result){
        console.log(result);
    })
    //如何返回一条记录
    db.collection('person').findOne({},function(err,result){
        console.log(result);
    });
    //修改记录
    db.collection('person').updateOne({},{$set:{age:300}},function(err,result){
        console.log(result.result);
    });

    //删除
    db.collection('person').removeMany({});
});