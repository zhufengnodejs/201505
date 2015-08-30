var express = require('express');
var path = require('path');//处理路径
var favicon = require('serve-favicon');//处理收藏夹图标
var logger = require('morgan');//日志组件
var cookieParser = require('cookie-parser');//解析cookie  req.cookies={}
var bodyParser = require('body-parser');//解析请求体 req.body
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');//主页Router
var users = require('./routes/users');//用户Router
var goods = require('./routes/goods');
var app = express();

// 设置模板保存的目录
app.set('views', path.join(__dirname, 'public'));
//设置模板引擎
app.set('view engine', 'html');
app.engine('html',require('ejs').__express);

//设置收藏夹图标
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//输出日志 并设置日志的格式
app.use(bodyParser.json());//解析请求体 application/json
app.use(bodyParser.urlencoded({ extended: false }));//解析请求体 application/urlencoded
app.use(cookieParser());//解析cookie
app.use(session({
  secret:'zhufengshop',
  resave:true,
  saveUninitialized:true,
  cookie:{
    maxAge:60*60*1000
  }
}));
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件中间件

app.use('/', routes);//设置路由
app.use('/users', users);//设置用户路由
app.use('/goods', goods);
//捕获404错误并转发到错误处理中间件上
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);//设置状态码
    res.render('error', {
      message: err.message,//错误的原因
      error: err//错误对象
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
