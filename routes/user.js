
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
            getUserInfo(tokenInfo.access_token,tokenInfo.openid).then(userInfo=>{
                userInfo=JSON.parse(userInfo)
                logger.log("info", "userInfo:"+JSON.stringify(userInfo));
                if (userInfo.hasOwnProperty('openid')){
                    userDao.add(userInfo).then(userResult =>{
                        userInfo['id']=userResult
                        logger.log("info", "-----userResult--------:"+JSON.stringify(userResult));
                        logger.log("info", "userInfo:"+JSON.stringify(userInfo));
                        res.send(userInfo);
                    })
                }
            })
    })
});

userRouter.get('/login', function(req, res, next) {
    logger.log("info", "user query:"+JSON.stringify(req.query));
    let qy = req.query
    userDao.queryByMobile(qy.mobile,qy.passowrd).then(userResult =>{
        res.send(userResult);
    })
    res.send(userInfo);
});



module.exports = userRouter;
