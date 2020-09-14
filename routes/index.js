
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatAPI = require('wechat-api');
const config = require('../config');
var Utils = require('../utils/utils')
var talk = require('../services/robot')
var getUserInfo = require('../services/wxUserInfo')
var {getOauth,getOauthToken} = require('../services/oauth')
var expect = require('expect.js');


var userToken={}
var api = new wechatAPI(config.appid, config.appsecret);
const menuConfig = {
    "button": [
        {
            "type": "view",
            "name": "关于我们",
            "url": "http://www.sunsd.cn/"
        },
        {
            "name": "个人中心",
            "sub_button": [
                {
                    "type": "view",
                    "name": "兑换卡券",
                    "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri=http%3a%2f%2fwww.sunsd.cn%2f%23%2f&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",
                },
                {
                    "type": "view",
                    "name": "我的",
                    "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appid+"&redirect_uri=http://www.sunsd.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",

}
            ]
        }
    ]
};
/* GET home page. */
router.get('/wechat', function(req, res, next) {
    var resl=Utils.getSignature(config,req.query)
    res.send(resl);
});

/* GET home page. */
router.get('/talk', function(req, res, next) {
    talk(req.query.talk).then(resl=>{
        res.send(resl);
        logger.log("info", "robot talk result:"+resl);
    })
});
/* GET home page. */
router.get('/menu', function(req, res, next) {

    try {
        var menu = JSON.stringify(menuConfig);
        api.createMenu(menu, function (err, result) {
            if (err){
                logger.log("info", "create menu:"+err);
            }else {
                logger.log("info", "create menu:"+JSON.stringify(result));
            }
        });
        res.send("createMenu success");
    } catch(e) {
        logger.log("error", "create menu error:"+JSON.stringify(e));
        res.send("createMenu failed");
    }
});

router.post('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
      //------------------------------------------------------------------------
      var message = req.weixin;
      logger.log("info", JSON.stringify(message));
    // 微信输入信息都在req.weixin上
    if (message.Content === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.Content === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else {
        // 回复高富帅(图文回复)
        talk(message.Content).then(resl=>{
            if (resl.indexOf("{br}")){
                resl=resl.replaceAll("{br}", "\n")
            }
            res.reply({
                content: resl,
                type: 'text'
            });
            logger.log("info", "robot talk result:"+resl);
        })
    }
})));
router.get('/getOauth', function(req, res, next) {

    logger.log("info", JSON.stringify(req.query));
    getOauth(config.appid);
});
router.get('/user', function(req, res, next) {
    logger.log("info", "user query:"+JSON.stringify(req.query));
    getOauthToken(config.appid,config.appsecret,req.query.code).then(tokenInfo=>{
        logger.log("info", "tokenInfo:"+JSON.stringify(tokenInfo));
        getUserInfo(tokenInfo.access_token,tokenInfo.access_token).then(userInfo=>{
            logger.log("info", "userInfo:"+JSON.stringify(userInfo));
            res.render('user', JSON.parse(userInfo));
        })
    })
});
module.exports = router;
