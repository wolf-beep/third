/** @format */
// 引入外部文件
const express = require("express");
const app = express();
const session = require('cookie-session')
const path = require('path')

// 实现功能1，实现网站日志的记录，使用封装好的中间件
app.use(require('./middlewares/cs-access-log'))

// 注册session中间件
app.use(session({
    name: "session",
    secret: "1cf5a92b5a5288b35d797cad0c3a52ac1c4ae734",
    maxAge: 1440000
}))

//使用body-parser中间件 
const body = require('body-parser')
app.use(body.urlencoded({
    extended: false
}))

// 配置art-template（模板引擎）
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// 静态资源托管
app.use(express.static("public"));




// 注册路由模块  admin.js (在router中)
app.use('/admin', require('./router/admin'))





// 配置404错误中间件
app.use((req, res, next) => {
    res.status(404).render('404.html')
})

// 监听端口8880
app.listen(8880, '0.0.0.0', () => {
    console.log("Server Is Runimg At http://127.0.0.1:8880");
});