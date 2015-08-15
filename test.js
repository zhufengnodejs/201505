function  A1(){
    this.name =function(){
        var i =0;
    }
}

function B1(){

}
B1.prototype.name = function(){
    var i =0;
}

var a = new B1();
var b = new B1();

console.time('second');
for(var i=0;i<1000000;i++){
    b.name();
}
console.timeEnd('second');
console.time('first');
for(var i=0;i<1000000;i++){
    a.name();
}
console.timeEnd('first');


