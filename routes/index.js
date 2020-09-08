const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatAPI = require('wechat-api');
const config = require('../config');
var Utils = require('../utils/utils')
var api = new wechatAPI(config.appid, config.appsecret);

/* GET home page. */
router.get('/wechat', function(req, res, next) {
  var resl=Utils.getSignature(config,req.query)
  res.send(resl);
  logger.log("info", resl);
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
    } else if (message.Content === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        res.reply([
            {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }
        ]);
    }
})));
module.exports = router;
