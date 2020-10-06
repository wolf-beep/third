const moiveModel = require("../../models/admin/MoiveModel");
const path = require("path");
const fs = require("fs");

module.exports = {
    showMoiveAddPage: (req, res) => res.render("moive/add"),
    moiveAddAction: (req, res) => {
        // 获取请求数据
        const file = req.file;
        const post = req.body;
        let info = {
            time: 3,
            message: "",
            url: "/admin/moive/add",
        };
        // 判断是否有文件上传
        if (!file) {
            info.message = "请先选择一个电影封面图片！";
            res.render("redirect", info);
            return true;
        } else {
            // 1. 找回文件的原始后缀
            const ext = path.extname(file.originalname);
            const newfilename = file.filename + ext;
            // res.send(newfilename)
            // 2. 将数据进行保存
            fs.rename(
                file.path,
                path.join(path.dirname(file.path), newfilename),
                async (err) => {
                    // 判断改名是否出错
                    if (err) {
                        info.message = "使用改名卡失败！";
                    } else {
                        // 成功
                        post.pic = '/uploads/' + newfilename
                        let result = await moiveModel.moiveAdd(post)
                        if (result.length) {
                            // 成功
                            info.message = "电影添加成功！";
                        } else {
                            // 失败
                            info.message = "电影添加失败！";
                        }
                    }
                    res.render('redirect', info)
                }
            );
        }
    },
};