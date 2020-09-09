
const requestSync = require('request');
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();


var talk=function(str) {
    logger.log("info", "start talk info:"+str);
    let options = {
        url: "http://api.qingyunke.com/api.php?key=free&appid=0&msg="+encodeURI(str)
    };
    return new Promise(function (resolve, reject) {
        requestSync.get(options, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                if (body.result ===0){
                    resolve(body.content);
                }
            }
        });
    });
};
module.exports = talk;
