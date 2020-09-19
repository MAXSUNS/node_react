
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var orderRouter = express.Router();
var cache= require('../utils/cache');

/* GET home page. */
orderRouter.get('/', function(req, res, next) {
    logger.log("info", "user query:"+JSON.stringify(req.query));
    let qy = req.query
    let result = cache.set(qy.key,qy.info)
    logger.info("save redis result :"+JSON.stringify(result))
    cache.get(qy.key).then(function(ret){
        logger.info("get redis is:"+JSON.stringify(ret))
        res.send(ret);
    });
});

module.exports = orderRouter;
