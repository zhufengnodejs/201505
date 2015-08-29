#简介
分式布开源数据库，用C++编写。
性能高，开源，无模式
是一个NOSQL和RDBMS之间的一座桥梁

# Document&BSON
1.BSON binary json
{
name:'zfpx',
age:6,
home:{
 country:'china',
 city:'bj'
},
hobby:['smoking','drink','dry']
}
2.mongodb 存储的基本单元是document,类似于mysql行。
服务器>数据库>集合>文档
            表    行
#如何插入文档
```db.person.insert({name:'zfpx',age:6});```

#批量插入文档
```db.person.insert([{name:'zfpx3',age:3},{name:'zfpx4',age:4}]);```

#查询数据
```db.person.find({name:'zfpx'})```

#查询一条数据
```db.person.find({name:'zfpx'},{name:1,_id:0}).limit(1)```
``` db.person.find({name:'zfpx'},{_id:0}).sort({age:-2}).limit(2)```

#更新文档
更新整个文档
```db.person.update({name:'zfpx'},{age:10});```
update 默认只会更新一行

```db.person.update({name:'zfpx'},{$set:{age:10}});```

##更新匹配到的所有行
```db.person.update({name:'zfpx'},{$set:{age:20}},{multi:true})```

##save 保存或更新
```db.person.save({_id:1,name:'zfpx',age:7}); ```
```db.person.save({_id:1,name:'zfpx',age:8}); ```

##删除文档
``` db.person.remove({_id:1}) ```

##数组查询
db.person.find({hobby:{$in:['smoke']}});
