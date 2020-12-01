var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var $sql = require('./orderSql');


var pool = mysql.createPool( config.sqlConfig );
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();

var insert= function (userId, consignee,mobile, address,price) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`insert order userId :${userId}`)
            connection.query($sql.insert, [userId,consignee,mobile, address,price], function(err, result) {
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

var updateAddress= function (orderId, consignee,mobile, address) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`update order orderId :${orderId}`)
            connection.query($sql.updateAddress, [consignee,mobile, address,orderId], function(err, result) {
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

var  queryByUserid= function (id) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`order queryByUserid  id:${id}`)
            connection.query($sql.queryByUserid, [id], function(err, result) {
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
var  queryByOrderid= function (id) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`order queryByOrderid  id:${id}`)
            connection.query($sql.queryByOrderid, [id], function(err, result) {
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

module.exports = {insert,queryByUserid,updateAddress,queryByOrderid};