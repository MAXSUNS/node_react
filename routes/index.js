var userDao =require("../dao/userDAO") ;
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatAPI = require('wechat-api');
const {wx} = require('../config');
var Utils = require('../utils/utils')
var talk = require('../services/robot')
var {getOauth} = require('../services/oauth')
var userRouter = require( './user')
var orderRouter = require( './order')
var userToken={}
var api = new wechatAPI(wx.appid, wx.appsecret);
const menuConfig = {
    "button": [
        {
            "type": "view",
            "name": "关于我们",
            "url": "http://www.sunsd.cn/"
        },
        {
                    "type": "view",
                    "name": "我的",
                    "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wx.appid+"&redirect_uri=http://www.sunsd.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        }
    ]
};

router.use('/user', userRouter);
router.use('/order', orderRouter);

/* GET home page. */
router.get('/wechat', function(req, res, next) {
    var resl=Utils.getSignature(wx,req.query)
    res.send(resl);
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

router.post('/wechat', wechat(wx, wechat.text(function (message, req, res, next) {
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
    getOauth(wx.appid);
});

module.exports = router;
