const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatAPI = require('wechat-api');
const config = require('../config');
var Utils = require('../utils/utils')
var talk = require('../services/robot')
var expect = require('expect.js');

var api = new wechatAPI(config.appid, config.appsecret);
const menuConfig = {
    "button": [
        {
            "type": "view",
            "name": "测试链接1",
            "url": "http://www.sunsd.cn/"
        },
        {
            "name": "测试链接2",
            "sub_button": [
                {
                    "type": "view",
                    "name": "测试链接2-1",
                    "url": "http://www.sunsd.cn/"
                },
                {
                    "type": "view",
                    "name": "测试链接2-2",
                    "url": "http://www.sunsd.cn/"
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
    var menu = JSON.stringify(menuConfig);
    api.createMenu(menu, function (err, result) {
        expect(err).not.to.be.ok();
        expect(result).to.have.property('errcode', 0);
        expect(result).to.have.property('errmsg', 'ok');
        done();
    });
    res.send("createMenu success");
});

router.post('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
      //------------------------------------------------------------------------
      var message = req.weixin;
      logger.log("info", message);
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
module.exports = router;
