exports.CachedType = {
  fileMatch:/^\.(gif|png|jpg|js|css)$/ig,
  maxAge:30 //缓存时间默认是30秒
}
//设置可以对哪些类型的文件进行压缩
exports.Compress = {
 match: /\.(css|js|html)/ig
}