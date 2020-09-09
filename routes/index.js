const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatAPI = require('wechat-api');
const config = require('../config');
var Utils = require('../utils/utils')
var talk = require('../services/robot')
var api = new wechatAPI(config.appid, config.appsecret);

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
            res.reply(resl.replaceAll("{br}", "\n"));
            logger.log("info", "robot talk result:"+resl);
        })
    }
})));
module.exports = router;
