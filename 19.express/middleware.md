app
Router 是一个容器
  stack = [];里面存放着所有的路由和中间件
每个fn 封闭了一个 layer
route = undefined

Route
route = 真正的路由对象
this.stack = []; 这是路由自己的stack


https://cnodejs.org/topic/545720506537f4d52c414d87


