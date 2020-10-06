// 路由模块
// 定义路由的请求方式、地址、回调函数

const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const uploader = multer({
    dest: path.join(__dirname, '../', "public", "uploads")
})

// 引入控制器
const AuthController = require('../app/controllers/admin/AuthCooler')
const indexcontroller = require("../app/controllers/admin/indexCooler");
const moiveController = require('../app/controllers/admin/MoiveCooler')


router.use(AuthController.islogin)

// 表单页面展示          定义了一个路由回调函数的控制器，这里调用控制器的方法
router.get('/register', AuthController.showRegisterPage)

// 注册提交
router.post('/register', AuthController.registerAction)

// 登录页面显示
router.get('/login', AuthController.showLoginPage)

// 登录提交处理
router.post('/login', AuthController.loginAction)




// 路由规则
// 后台首页
router.get("/index", indexcontroller.showIndexPage);

router.get("/welcome", indexcontroller.showWelcomePage);

// 展示电影添加页面
router.get("/moive/add", moiveController.showMoiveAddPage)
router.post("/moive/add", uploader.single('pic'), moiveController.moiveAddAction)


module.exports = router