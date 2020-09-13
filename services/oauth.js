
const request = require('request');
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();


var getOauth=function(appid) {
    logger.log("info", "getOauth start!");
    let options = {
        url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http%3A%2F%2www.sunsd.cn%2api%2user&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",
        method: "GET",
        json: true,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                logger.log("error", "getOauth error:"+error);
                reject(error);
            } else {
                logger.log("info", "getOauth end!response:"+JSON.stringify(response));
                logger.log("info", "getOauth end!body:"+JSON.stringify(body));
            }
        });
    }).catch(error =>
        logger.log("error", "getOauth Promise error:"+error)
    );
};

var getOauthToken=function(appid,secret,code) {
    logger.log("info", "getOauthToken start!");
    let options = {
        url: "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+secret+"&code="+code+"&grant_type=authorization_code",
        method: "GET",
        json: true,
    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                logger.log("error", "getOauthTokenerror:"+error);
                reject(error);
            } else {
                logger.log("info", "getOauthToken end!body:"+JSON.stringify(body));
                resolve(body);
            }
        });
    }).catch(error =>
        logger.log("error", "getOauthToken Promise error:"+error)
    );
};

module.exports = {getOauthToken,getOauth};