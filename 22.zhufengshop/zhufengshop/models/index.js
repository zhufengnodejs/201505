var mongoose = require('mongoose');
mongoose.connect('mongodb://123.57.143.189/zhufengshop');
exports.User = mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));