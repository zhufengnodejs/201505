var crypto = require('crypto');
var nonce = Math.random();
var ts = new Date().getTime();
var key = '这个key需要你和后台约定';
var str = nonce+key+ts;
str = str.slice(1, s.length-1);
var token  = crypto.createHash('md5').update(s).digest('hex');
console.log(token);

$(function() {

    $("#test").click(function() {
        $.ajax({
            type: "GET",
            url: "default.aspx",
            beforeSend: function(request) {
                request.setRequestHeader("nonce", nonce);
                request.setRequestHeader("ts", ts);
                request.setRequestHeader("token", token);
            },
            success: function(result) {
                alert(result);
            }
        });
    });
});