var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatAPI = require('wechat-api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
      //------------------------------------------------------------------------
      var message = req.weixin;
      logger.log("info", message);

      res.reply('Message Send To Bot Completed , Wait Response.');

      api.sendText(message.FromUserName, 'this message from wechat-api', function (err, result) {
        if (err) {
          logger.log('error', err);
        }
        logger.log('info', 'reply message success');
      });

    }).image(function (message, req, res, next) {
      var message = req.weixin;
      logger.log("info", message);

      res.reply('功能开发中');
    }).voice(function (message, req, res, next) {
      var message = req.weixin;
      logger.log("info", message);

      res.reply('功能开发中');
    }).video(function (message, req, res, next) {
      var message = req.weixin;
      logger.log("info", message);

      res.reply('功能开发中');
    }).location(function (message, req, res, next) {
      var message = req.weixin;
      logger.log("info", message);

      res.reply('功能开发中');
    }).link(function (message, req, res, next) {
      var message = req.weixin;
      logger.log("info", message);

      res.reply('功能开发中');
    }).event(function (message, req, res, next) {
      var message = req.weixin;
      logger.log("info", message);

      res.reply('感谢你的关注，你也可以在nodejs npm中查看wechat和wechat-api');

    }).device_text(function (message, req, res, next) {
      var message = req.weixin;
      logger.log("info", message);

      res.reply('功能开发中');
    }).device_event(function (message, req, res, next) {
      if (message.Event === 'subscribe' || message.Event === 'unsubscribe') {
        var message = req.weixin;
        logger.log("info", message);

        res.reply("功能开发中");
      } else {
        var message = req.weixin;
        logger.log("info", message);

        res.reply('功能开发中');
      }
})));
module.exports = router;
