var express = require('express');
var router = express.Router();
var models = require('../models');
var async = require('async');
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
router.post('/addCart/:goodId',function(req,res){
  var uId = req.session.userId;
  var gId = req.params.goodId;
  models.Cart.findOne({uId:uId,gId:gId},function(err,cart){
    if(cart){
      models.Cart.update({_id:cart._id},{$inc:{quantity:1}},function(err,result){
        if(err){
          res.json(500,{msg:err});
        }else{
          res.json(result);
        }
      });
    }else{
      new models.Cart({
        uId:uId,
        gId:gId
      }).save(function(err,cart){
            if(err){
              res.json(500,{msg:err});
            }else{
              res.json(cart);
            }
      });;
    }
  });

});


router.post('/batchDelete',function(req,res){
  var _ids = req.body._ids;
  var tasks  = [];
  _ids.forEach(function(_id){
    tasks.push(function(callback){
      models.Goods.remove({_id:_id},callback);
    });
  });
  async.parallel(tasks,function(err,result){
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
