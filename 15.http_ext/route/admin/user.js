exports.add = function(req,res,username,age){
    res.end('add '+username+' '+age);
},
exports.delete = function(req,res,id){
    res.end('delete '+id);
}