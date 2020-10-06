// 引入
const {
    model
} = require('../../../database/coon_mongodb')
const moive_schema = require('../../../database/migrations/create_moive_tables')

// 定义模型
class moiveModel {
    constructor() {
        this.model = model("Moive", moive_schema, "moives")
    }
    moiveAdd(data) {
        return this.model.insertMany(data)
    }
    findMoive(data) {
        return this.model.findOne(data)
    }
}

module.exports = new moiveModel();