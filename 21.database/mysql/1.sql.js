var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'123.57.143.189',
    user:'root',
    password:'zfpx2015',
    database:'zfpx05'
});
connection.connect();
var username = 'zs \' or 1=\'1';//SQL注入攻击
var password = "1234568";
var sql = "select * from user where username ='"
    +username+"' and password='"+password+"'";
console.log(sql);
connection.query(sql,function(err,rows,fields){
    if(err){
        throw err;
    }else{
        if(rows && rows.length>0){
            console.log('登陆成功');
        }else{
            console.log('登陆失败');
        }
    }
});