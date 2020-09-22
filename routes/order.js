
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
var express = require('express');
var orderRouter = express.Router();
var cache= require('../utils/cache');
const exchangeDAO = require('../dao/exchangeDAO');
const orderService = require('../services/order');

/* GET home page. */
orderRouter.get('/', function(req, res, next) {
    logger.log("info", "user query:"+JSON.stringify(req.query));
    let qy = req.query
    orderService.getOrderByUserId(qy.userId).then(ret => {
        logger.log("info", "123orderGoodsResult result:"+JSON.stringify(ret));
        res.send(ret)
    })

    // let result = cache.set(qy.key,qy.info)
    // logger.info("save redis result :"+JSON.stringify(result))
    // cache.get(qy.key).then(function(ret){
    //     logger.info("get redis is:"+JSON.stringify(ret))
    //     res.send(ret);
    // });
});


/* GET home page. */
orderRouter.get('/exchange', function(req, res, next) {
    logger.log("info", "exchange query:"+JSON.stringify(req.query));
    let qy = req.query
    exchangeDAO.queryByCode(qy.code,qy.password).then(result=> {
        logger.log("info", "exchange search result:" + JSON.stringify(result));
        if (result.length>0 && result[0].status===0){
            exchangeDAO.updateExchange(qy.userId,1,qy.code).then(updateResult=> {
                logger.log("info", "exchange update result:"+JSON.stringify(updateResult));
                orderService.addOrder(result[0].goods_id,qy.userId)
                res.send("兑换成功，请在-我的订单-中完善收货信息。");
            })
        }else {
            res.send("该兑换码已兑换，请确认后重试！");
        }
    })
});

module.exports = orderRouter;
