#介绍
1. mysql是一个多用户，多线程的SQL数据库服务器。
使用提SQL(结构化查询语言)
2. 由服务器和客户端组成的。

#创建数据库
``` create database zfpx05;```

#切换数据库
```use zfpx05```

#删除数据库
``` drop database zfpx05; ```

#显示数据库
```show databases like 'db%';```
```show databases```

#创建表
```mysql> create table person(id int primary key auto_increment,name varchar(32))```
primary key 主键
auto_increment 自动增长

#插入行
```insert into person(name) values('zfpx');```

#查询行
```select * from person;```

#修改行
```update person set name = 'zfpx2' where id=1;```

#删除行
delete from  person where id = 1;

#增加列
``` alter table person add age int;```

#修改列
```alter table person modify age varchar(2);```

#修改列名
```alter table person change age age2 int;```

#删除列
``` alter table person drop age2;```

#修改表名
```alter table person rename student;```

#查询
##查询结构
select 列名
from 表名
where 条件
group by 分组列
having 对分组后的数据进行过滤
order by 排序条件

##基础数据
2	zhang3	80	bj
3	li4	70	bj
4	wang5	90	sh

##案例

###我要查询所有的分数
```select score from student;```

###查询北京考生的分数
```select score from student where city = 'bj';```

###查询各个城市考生的平均成绩
```select city,avg(score) from student group by city;```
min max sum count(计算总行数)```

###查询平均分数大于等于90分的城市数据
```select city,avg(score) from student group by city having avg(score)>=90```
###查询平均分数大于等于60分的城市数据,并且按分数从高到底进行排序
```select city,avg(score) from student group by city having avg(score)>=60 order by avg(score) desc;```

#表连接

##如何建立表连接
```select s.name,c.name,sc.score from student s,course c,score sc
where s.id = sc.stu_id and c.id = sc.course_id;```

##内连接
```select s.name,c.name,sc.score from student s inner join score sc
on s.id = sc.stu_id inner join course c on c.id = sc.course_id```

##左连接
```select s.name,c.name,sc.score from student s left join score sc
on s.id = sc.stu_id left join course c on c.id = sc.course_id```

