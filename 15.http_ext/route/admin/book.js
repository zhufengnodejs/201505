exports.add = function(req,res,bookname,price){
    res.end('add '+bookname+' '+price);
},
exports.delete = function(req,res,id){
    res.end('delete '+id);
}