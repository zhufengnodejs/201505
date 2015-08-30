var express = require('express');
var router = express.Router();
var models = require('../models');
var async = require('async');
router.get('/list',function(req,res){
  models.Cart.find({}).populate("gId").exec(function(err,carts){
    if(err){
      res.json(500,{msg:err});
    }else{
      res.json(carts);
    }
  });
});
router.post('/changeQuantity',function(req,res){
  models.Cart.update({_id:req.body._id},{$set:{quantity:req.body.quantity}},function(err,result){
    if(err){
      res.json(500,{msg:err});
    }else{
      res.json(result);
    }
  });
});
module.exports = router;
