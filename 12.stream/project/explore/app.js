/*
 * 1.程序启动时显示前前目录下的所有文件和文件夹
 * 2.选择文件，显示文件内容
 * 3.选择目录，显示目录下的文件或文件夹
 * 4.选择之后退出程序
 *
 * 1.读文件夹
 * 2.判断是文件还是目录
 * 3.读取文件内容
 * 4.读取用户输入
 */

var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
var path = require('path');
/**
 * __dirname
 * process.cwd()
 * path.resovle()
 */
fs.readdir(process.cwd(),function(err,files){
    console.log('');
    if(!files.length){
        return console.log('木有任何文件');
    }// a b c
    var stats = {};
    function showFile(i){
       var filename = files[i];
       fs.stat(path.join(process.cwd(),filename),function(err,stat){
           stats[i] = stat;
           if(stat.isDirectory()){
               console.log(' '+i+' \033[31m'+ filename+'\033[39m');
           }else{
               console.log(' '+i+' \033[32m'+ filename+'\033[39m');
           }
           i++;
           if(i == files.length){
                readChoice();
           }else{
               showFile(i);
           }
       });
    }
    showFile(0);
    function readChoice(){
        console.log('');
        stdout.write('请输入你的选择');
        stdin.resume();//可以接收用户输入
        stdin.setEncoding('utf8');
        stdin.on('data',onData);
    }
    function onData(data){
        var index = Number(data);
        var stat = stats[index];
        if(!stat){
            stdout.write('请输入正确的选项');
        }else{
            if(stat.isDirectory()){
                fs.readdir(path.join(process.cwd(),files[index]),function(err,subFiles){
                    console.log('');
                    console.log('('+subFiles.length+')');
                    subFiles.forEach(function(subfile){
                        console.log(' -'+subfile);
                    });
                    console.log('');
                    process.exit(0);
                });
            }else{
                fs.readFile(path.join(process.cwd(),files[index]),'utf8',function(err,data){
                    console.log('');
                    console.log(data);
                    process.exit(0);
                })
            }
        }
    }
})