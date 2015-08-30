var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/add',function(req,res){
  var _id = req.body._id;
  if(_id){
    models.Goods.update({_id:_id},req.body,function(err,good){
      if(err){
        res.json(500,{msg:err});
      }else{
        res.json(good);
      }
    });
  }else{
    new models.Goods({name:req.body.name,price:req.body.price,imgSrc:req.body.imgSrc}).save(function(err,good){
      if(err){
        res.json(500,{msg:err});
      }else{
        res.json(good);
      }
    });
  }
});

router.post('/delete',function(req,res){
  models.Goods.remove({_id:req.body._id},function(err,result){
    if(err){
      res.json(500,{msg:err});
    }else{
      res.json(result);
    }
  });

});

router.get('/list',function(req,res){
  models.Goods.find({},function(err,goods){
    if(err){
      res.json(500,{msg:err});
    }else{
      res.json(goods);
    }
  });
});
module.exports = router;
