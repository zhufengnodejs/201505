var mongoose = require('mongoose');
var assert = require('assert');
var connection = mongoose.createConnection('mongodb://123.57.143.189/zfshop',function(err){
    assert.equal(null,err);//当两个参数不相等的时候会报错
});
var Schema =mongoose.Schema;
var ObjectId = Schema.ObjectId;
//创建自己的模式定义
var AuthorSchema = new Schema({
 name:String
});

var Author = connection.model('Author',AuthorSchema);
//评论
var CommentSchema = new Schema({
    content:String,
    date:Date
});
//文章
var ArticleSchema = new Schema({
    title:{type:String,index:true},
    content:String,
    date:Date,
    author:{type:ObjectId,ref:'Author'},//引用别的模型
    stat:{//子文档
        favs:Number,
        visited:Number
    },
    comment:[CommentSchema]//评论数组
});

ArticleSchema.pre('save',function(next){
  this.stat = {
      visited:100,
      favs:50
  }
    this.date = new Date();
    next();
});

var Article = connection.model('Article',ArticleSchema);

//new Author({name:'zfpx'}).save();
//55e125d3a7442cc016a42449

var article = new Article({
    title:'zfpx7',
    content:'zfpx7',
    author:'55e125d3a7442cc016a42449',
    comment:[{content:'comment7',date:new Date()}]
});

/*
article.save(function(err,result){
    assert.equal(null,err);
    console.log(result);
});
*/

/*Article.find({content:'zfpx1'},function(err,result){
    console.log(result);
});*/

/*var pageNum = 2;
var pageSize = 3;
Article.count(function(err,total){
    var totalPages = Math.ceil(total/pageSize);
    var skip = (pageNum-1)*pageSize;
    Article.find({}).skip(skip).limit(pageSize).sort({date:1}).populate("author").exec(function(err,result){
        console.log(totalPages);
        console.log(result);
    });
});*/
/*

Article.update({},{$set:{title:'title'}},{multi:true},function(err,result){
    console.log(result);
})*/
/*
Article.remove({_id:'55e127d782662d540d7e921c'},function(err,result){
console.log(result);
});
*/
Article.findOne({},function(err,ret){
    console.log(ret);
});

