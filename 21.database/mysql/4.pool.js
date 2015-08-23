var mysql = require('mysql');
/**
 * 连接池是是一个创建并管理连接缓冲池的技术。
 * 1. 减少连接时间
 * 2. 简化连接编程模型
 * 3. 受控的资源引用
 * 4.
 */
var pool = mysql.createPool({
    host:'123.57.143.189',
    user:'root',
    password:'zfpx2015',
    database:'zfpx05',
    connectionLimit:2,//连接池中最多可以创建多少个连接
    queueLimit:8,//队伍中的等待连接的数量 0为限制
    acquireTimeout:10000 //默认的等待时间
})


/*pool.query('select * from user',[],function(err,result){
    console.log(result);
});*/
pool.on('connection',function(){
    console.log('一个新的连接被创建'); //2
});

//当一个回调夺入队伍等待连接的时候被触发
pool.on('enqueue',function(){
    console.log('有新回调加入队伍');// 2
});
console.time('cost');
function startQuery(){
    pool.getConnection(function(err,connection){
        connection.query('select * from user',function(err,rows){
            console.log(rows.length);
            console.timeEnd('cost');// 2000+毫秒
            setTimeout(function(){
                connection.release();
            },1000)
        });
    });
}
startQuery();
startQuery();
startQuery();
startQuery();