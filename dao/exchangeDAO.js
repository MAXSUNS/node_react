var mysql = require('mysql');

var config = require('../config');
var $sql = require('./exchangeSql');

var pool = mysql.createPool( config.sqlConfig );
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();

var queryByCode= function (code,password) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info(`queryByCode :${code},by:${password}`)
            connection.query($sql.queryByCode, [code,password], function(err, result) {
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

var  updateExchange= function (userId,status,code) {

    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            // 兑换状态 0：初始状态  1：已兑换 2：已作废
            logger.info(`update exchange code :${userId},by:${status},to :${code}`)
            connection.query($sql.updateExchange, [userId, status, code], function(err, result) {
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

module.exports = {queryByCode,updateExchange};
