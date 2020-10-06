module.exports = {
    // 展示后台首页
    showIndexPage: (req, res) => {
        res.render("./index/index");
    },

    // 展示欢迎页
    showWelcomePage: (req, res) => {
        res.render("./index/welcome");
    },
};