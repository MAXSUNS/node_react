
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();
const goodsDAO = require('../dao/goodsDAO');
const orderDAO = require('../dao/orderDAO');
const orderGoodsDAO = require('../dao/orderGoodsDAO');


var addOrder=function(goodId,userId) {
    goodsDAO.queryByGoodsid(goodId).then(goodsResult=> {
        logger.log("info", "queryByGoodsid result:"+JSON.stringify(goodsResult));
        const goodInfo=goodsResult[0]
        orderDAO.insert(userId,"","","").then(orderResult=> {
            logger.log("info", "orderResult update result:"+JSON.stringify(orderResult));
            const infos=[]
            for (i = 1; i <= goodInfo.number; i++) {
                const info=[orderResult.insertId,goodId,goodInfo.name,i]
                infos.push(info)
            }
            orderGoodsDAO.batchInsert(infos).then(batchInsertResult=> {
                logger.log("info", "orderResult batchInsert result:"+JSON.stringify(batchInsertResult));
            })
        })
    })
};

var  getOrderByUserId=async function(userId) {
    const orders=[]
    orderDAO.queryByUserid(userId).then(orderResult=> {
        logger.log("info", "orderResult update result:"+JSON.stringify(orderResult));
        var promises = [];
        orderResult.forEach(async orderInfo=>{
            promises.push(
                orderGoodsDAO.queryByOrderid(orderInfo.id).then(async orderGoodsResult=> {
                logger.log("info", "orderGoodsResult result:"+JSON.stringify(orderGoodsResult));
                orderInfo['orders']=orderGoodsResult;
                orders.push(orderInfo);
                })
            );
        });
        return Promise.all(promises).then((va) =>{
            logger.log("info", "345orderGoodsResult result:"+JSON.stringify(orders));
            return orders
            }
        )
    })
};
module.exports = {addOrder,getOrderByUserId};