var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var $sql = require('./orderGoodsSql');



var pool = mysql.createPool( config.sqlConfig );
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();

var insert= function (orderId, goodsId, goodsName, number) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`insert orderGoodsSql orderId :${orderId}`)
            connection.query($sql.insert, [orderId, goodsId, goodsName, number], function(err, result) {
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

var batchInsert= function (info) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`insert orderGoodsSql orderId :${info}`)
            connection.query($sql.batchInsert, [info], function(err, result) {
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

module.exports = {insert,queryByOrderid,batchInsert};