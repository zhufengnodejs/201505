/**
 * query req.query
 * params req.params
 *
 **/
var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var multer = require('multer');
app.set('view engine','html');
app.set('views',__dirname);
app.engine('html',require('ejs').__express);
app.use(serveStatic(__dirname));
var upload = multer();
app.use(bodyParser.urlencoded({extended:true}));
var users = [];
app.param('uid',function(req,res,next){
    for(var i=0;i<users.length;i++){
        if(users[i].id == req.params.uid){
            req.user = users[i];
            break;
        }
    }
    next();
});

app.use('/user/edit/:uid',function(req,res){
    console.log(req.user);
    //res.end('hello');
    res.render('form',{user:req.user});
});
var fs= require('fs');
app.post('/users/doAdd', upload.single('avatar'),function(req,res){
    users.push(req.body);
console.log(req.body);
    console.log(req.file);
    fs.writeFile(req.file.originalname,req.file.buffer);
    res.json(req.files);
});
app.listen(8080);

