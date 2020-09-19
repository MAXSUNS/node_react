
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var userRouter = express.Router();


/* GET home page. */
userRouter.get('/', function(req, res, next) {
    logger.log("info", "user query:"+JSON.stringify(req.query));
    getOauthToken(wx.appid,wx.appsecret,req.query.code).then(tokenInfo=>{
        logger.log("info", "tokenInfo:"+JSON.stringify(tokenInfo));
        getUserInfo(tokenInfo.access_token,tokenInfo.access_token).then(userInfo=>{
            logger.log("info", "userInfo:"+JSON.stringify(userInfo));
            userDao.add(userInfo)
            res.send(userInfo);
        })
    })
});

module.exports = userRouter;
