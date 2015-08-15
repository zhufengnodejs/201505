/**
 * session 会话
 * 进行会话跟踪的，数据存放在服务器端
 *
 */

var http = require('http');
var url = require('url');
var parse = require('./parse');
var cookieUtils = require('./cookieUtils');
var SESSION_KEY = 'zfkey';
var EXPIRE_TIME = 1000*10;
var session = {};
var PWD = 'qwert';
var crypto = require('crypto');
http.createServer(function(req,res){
    parse(req);
    var userAgent = req.headers['x-forwarded-for']+req.headers['user-agent'];
    var now = Date.now();
    if(req.pathname == '/favicon.ico'){
        res.end('404');
    }else{
        var cookieObj = cookieUtils.parse(req.cookie);
        if(cookieObj[SESSION_KEY]){
            var sessionId = cookieObj[SESSION_KEY];
            sessionId = unsign(sessionId);
            var sessionObj = session[sessionId];//判断是否是合法的sessionObj
            if(sessionObj && sessionObj.expTime && sessionObj.expTime.getTime() > now){
                sessionObj.mny = sessionObj.mny - 10;
                sessionObj.expTime = new Date(now+EXPIRE_TIME);
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.end('欢迎你我的老朋友，你现在的余额是'+sessionObj.mny);
            }else{
                var sessionObj = {mny:100,expTime:new Date(now+EXPIRE_TIME)};
                var sessionId = now+'_'+Math.random();
                session[sessionId] = sessionObj;
                sessionId = sign(sessionId);
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8',
                    'Set-Cookie': cookieUtils.serialize(SESSION_KEY,sessionId)
                })
                res.end('欢迎你我的老朋友,你的密钥不对，再送你'+sessionObj.mny+'元新的购物卡');
            }
        }else{
            var sessionObj = {mny:100,expTime:new Date(now+EXPIRE_TIME)};
            var sessionId = now+'_'+Math.random();
            session[sessionId] = sessionObj;
            sessionId = sign(sessionId);
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8',
               'Set-Cookie': cookieUtils.serialize(SESSION_KEY,sessionId)
            })
            res.end('欢迎你我的新朋友,送你'+sessionObj.mny+'元的购物卡');
        }
    }
    //对sessionId进行加密
    function sign(val){
      return val+"@"+crypto.createHmac('sha256',PWD+userAgent)
            .update(val).digest('hex');
    }
    //对sessionId进行解密
    function unsign(val){
        var str = val.slice(0,val.lastIndexOf('@'));
       console.log(str,sign(str),val);
        return sign(str) == val?str:false;
    }

}).listen(8080);