// 导入   连接mongoDB文件
const {
    Schema
} = require('../coon_mongodb')


// 定义schema规则
const user_chema = new Schema({
    username: {
        type: String,
        minlength: 2,
    },
    password: {
        type: String,
        minlength: 6,
    },
})

// 导出
module.exports = user_chema