// 导入连接mongo数据库文件
const {
    host,
    opts
} = require('../config/mongodb.js')
const mongoose = require('mongoose')
mongoose.connect(host, opts)

// 导出
module.exports = mongoose