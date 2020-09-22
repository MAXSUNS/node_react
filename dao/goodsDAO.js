var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var $sql = require('./goodsSql');


var pool = mysql.createPool( config.sqlConfig );
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();


var queryByGoodsid= function (goodsid) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`goodsid :${goodsid}`)
            connection.query($sql.queryByGoodsid, [goodsid], function(err, result) {
                connection.release();
                if(err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    });
    promise.then(function (value) {
        return value;
    }, function (value) {});
    return promise;
}

var  updateGoods= function (name,id) {

    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            // 兑换状态 0：初始状态  1：已兑换 2：已作废
            logger.info(`update exchange name :${name},id:${id}`)
            connection.query($sql.updateGoods, [name,id], function(err, result) {
                connection.release();
                if(err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    });
    promise.then(function (value) {
        return value;
    }, function (value) {});
    return promise;
}

module.exports = {queryByGoodsid,updateGoods};