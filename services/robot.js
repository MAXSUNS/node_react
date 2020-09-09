
const request = require('request');
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();


var talk=function(str) {
    logger.log("info", "start talk info:"+str);
    let options = {
        url: "http://api.qingyunke.com/api.php?key=free&appid=0&msg="+encodeURI(str),
        method: "GET",
        json: true,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                logger.log("error", "robot talk error:"+error);
                reject(error);
            } else {
                if (body.result ===0){
                    resolve(body.content);
                }
            }
        });
    }).catch(error =>
        logger.log("error", "robot talk  Promise error:"+error)
    );
};
module.exports = talk;
