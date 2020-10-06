const fs = require("fs");
const path = require("path");
const moment = require("moment");

var logAccesssInfo = (req, res, next) => {
    // 准备好日志的数据
    let ip = req.ip;
    let time = moment().format("YYYY-MM-DD HH:mm:ss");
    let type = req.method;
    let uri = req.url;
    let userAgent = req.headers["user-agent"];
    let record = `${ip} - ${time} - ${type} - ${uri} - ${userAgent}\n`;
    let filename = path.join(
        __dirname,
        "../",
        "logs",
        moment().format("YYYYMMDD") + ".log"
    );
    if (fs.existsSync(filename)) {
        // 追加写
        fs.appendFileSync(filename, record);
    } else {
        // 新建文件
        fs.writeFileSync(filename, record);
    }
    // 继续下一步
    next();
};

module.exports = logAccesssInfo;
