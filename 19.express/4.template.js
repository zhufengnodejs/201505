/**
 * 模板
 * 1.安装ejs npm install ejs
 * 2.
 **/
var fs = require('fs');
var express = require('express');
var app = express();
app.set('view engine','xml');//设置模板引擎
app.set('views',__dirname);//设置模板的存放路径
//app.engine('.xml',require('ejs').__express);
app.engine('.xml',myrender);
app.get('/',function(req,res){
    res.setHeader('Content-Type','text/html');
    res.render('index',{username:'zfpx'});
});

app.listen(8080);

function myrender(path,data,cb){
    var content = fs.readFileSync(path,{encoding:'utf8'});
    content  =  content.replace('<%=username%>',data.username);
    console.log(content);
    cb(content);
}
