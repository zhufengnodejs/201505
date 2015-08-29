/**
 * 事务
 * 事件的四大条件ACID
 * Atomaic 原子性  不可再分，要么全成功，要么全失败
 * Consistency 一致性
 * Isolation 隔离性 多个事务同时发生，应该可以独立
 *  Durability 持久性 成功执行的事务是持久的
 **/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'123.57.143.189',
    user:'root',
    password:'zfpx2015',
    database:'zfpx05'
});
connection.connect();
connection.beginTransaction(function(err){
    if(err) throw err;
    connection.query('update user set balance= balance-50 where id = 1',function(err,result){
        if(err){
            connection.rollback(function(){
                throw err;
            })
        }
        connection.query('update 3user set balance = balance + 50 where id=2',function(err,result){
            if(err){
                connection.rollback(function(){
                    throw err;
                })
            }
            connection.commit(function(err){
                if(err){
                    connection.rollback(function(){
                        throw err;
                    })
                }
                console.log('转账成功');
            });
        });
    });

})
