
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var userRouter = express.Router();
var {getOauthToken} = require('../services/oauth')
var getUserInfo = require('../services/wxUserInfo')
const {wx} = require('../config');

const userDao = require('../dao/userDAO');

/* GET home page. */
userRouter.get('/', function(req, res, next) {
    logger.log("info", "user query:"+JSON.stringify(req.query));
    getOauthToken(wx.appid,wx.appsecret,req.query.code).then(tokenInfo=>{
        logger.log("info", "tokenInfo:"+JSON.stringify(tokenInfo));
        if (tokenInfo.hasOwnProperty('access_token')){
            getUserInfo(tokenInfo.access_token,tokenInfo.access_token).then(userInfo=>{
                logger.log("info", "userInfo:"+JSON.stringify(userInfo));
                if (userInfo.hasOwnProperty('openid')){
                    userDao.add(userInfo)
                }
                res.send(userInfo);
            })
        }
    })
});

/* GET home page. */
userRouter.get('/', function(req, res, next) {
    logger.log("info", "user query:"+JSON.stringify(req.query));
    getOauthToken(wx.appid,wx.appsecret,req.query.code).then(tokenInfo=>{
        logger.log("info", "tokenInfo:"+JSON.stringify(tokenInfo));
        if (tokenInfo.hasOwnProperty('access_token')){
            getUserInfo(tokenInfo.access_token,tokenInfo.access_token).then(userInfo=>{
                if (userInfo.hasOwnProperty('openid')){
                    userDao.add(userInfo).then(userResult =>{
                        userInfo['id']=userResult
                        logger.log("info", "userInfo:"+JSON.stringify(userInfo));
                        res.send(userInfo);
                    })
                }
            })
        }
    })
});

module.exports = userRouter;
