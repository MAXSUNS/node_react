
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var userRouter = express.Router();


/* GET home page. */
userRouter.get('/', function(req, res, next) {
    res.send("resl");
});

module.exports = userRouter;
