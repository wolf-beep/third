const mongoose = require('../coon_mongodb')
const moive_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    pic: String,
    hot: Number,
    dt: String,
    director: String,
})
module.exports = moive_schema