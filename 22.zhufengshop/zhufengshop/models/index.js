var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var ObjectId = Schema.ObjectId
exports.User = mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));
exports.Goods = mongoose.model('Goods',new mongoose.Schema({
    name:String,
    price:Number,
    imgSrc:String
}));

exports.Cart = mongoose.model('Cart',new mongoose.Schema({
    uId:{type:ObjectId,ref:'User'},
    gId:{type:ObjectId,ref:'Goods'},
    quantity:{type:Number,default:1}
}));