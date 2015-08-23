var express = require('express');
var app = express();
app.use('/',function(req,res,next){
    console.log('use1');
    next();
});
app.use('/',function(req,res,next){
    console.log('use2');
    next();
});

app.use('/',require('./routes/index'));

app.listen(8080);

