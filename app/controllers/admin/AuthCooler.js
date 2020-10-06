// 这里定义的是路由的回调函数的控制器
// 这里执行的是 路由被访问之后需要执行的相关函数或者是页面内容

// 引入模型
const userModel = require('../../models/admin/UserModel')

// 归档当前模块的路由处理回调方法
module.exports = {
    // 这里定义的是get请求页面返回  注册页面的回调函数
    showRegisterPage: (req, res) => {
        res.render('./auth/register');
    },
    // 这里定义的是post数据提交之后的回调处理函数
    registerAction: async (req, res) => {
        // 这里使用解构赋值直接从请求体中获取相关信息
        let {
            username,
            password,
            repassword,
            agree
        } = req.body;

        // 这里定义一个变量info用来存储模板引擎的相关数据信息（主要是为了不用重复去写一些相同的代码）
        let info = {
            time: 3,
            url: '/admin/register',
            message: "",
        }

        //判断，如果获取不到的agree的值那么久就跳转到相关页面 
        if (!agree) {
            info.message = "请先同意许可协议"
            res.render('redirect', info)
            return true
        }
        if (username.length < 2) {
            info.message = "用户名至少为两个字符"
            res.render("redirect", info)
            return true
        }
        if (password.length < 6) {
            info.message = "密码至少为六个字符"
            res.render('redirect', info)
            return true
        }
        if (repassword.length != password.length) {
            info.message = "两次密码输入不一致"
            res.render('redirect', info)
            return true
        }
        // 从userModel（分离出的）拿到方法
        let result = await userModel.findUser({
            username
        })
        if (result) {
            info.message = "用户名已经被占用"
            res.render('redirect', info)
            return true
        }

        // 正常项目中密码都是加密处理的，不会明文写入数据表
        let ret = await userModel.addUser({
            username,
            password
        })
        if (ret) {
            info.message = "恭喜您,账号注册成功！";
            info.url = '/admin/login'
            res.render('redirect', info)
            return true
        } else {
            info.message = "注册失败，请联系管理员"
            res.render('redirect', info)
            return true
        }
    },

    // 展示登录页面
    showLoginPage: (req, res) => {
        res.render('./auth/login')
    },

    // 登录界面提交处理
    loginAction: async (req, res) => {
        let {
            username,
            password,
        } = req.body;
        let info = {
            time: 3,
            url: '/admin/login',
            message: "登录失败，用户名或密码错误",
        }

        let un = await userModel.findUser({
            username,
            password
        })
        console.log(un, username);
        if (un) {
            info.message = "登录成功！";
            info.url = "/admin/index";
            // 记录会话信息
            req.session.username = un.username;
            res.render('redirect', info)
        } else {
            res.render('redirect', info)
        }
    },
    //中间件
    islogin: (req, res, next) => {
        if (!req.session.username && req.url != '/login' && req.url != '/register') {
            let info = {
                time: 3,
                url: '/admin/login',
                message: "请先登录在访问本页面",
            }
            res.render('redirect', info)

        } else {
            next()
        }
    }
}