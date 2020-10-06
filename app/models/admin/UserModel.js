// 导入
// 使用解构赋值 获取到coon_mongodb中连接方法
const {
    model
} = require('../../../database/coon_mongodb')

//获取schema规则从 create_users_tables 中
const user_chema = require('../../../database/migrations/create_users_tables')


// model 是由schema 生成的模型，模型是最终用来进行数据增删改查操作使用的，可以对数据库的操作
// 定义构造函数
// 定义相关处理函数
class userModel {
    constructor() {
        this.model = model('user', user_chema, 'users');
    }
    findUser(data) {
        return this.model.findOne(data)
    }
    addUser(data) {
        return this.model.insertMany(data)
    }
}

// 导出
module.exports = new userModel