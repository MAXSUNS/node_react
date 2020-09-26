var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var $sql = require('./userSql');

var pool = mysql.createPool( config.sqlConfig );
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();

var add=function (userInfo) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            logger.info("add user :"+JSON.stringify(userInfo))
            queryByOpenid(userInfo.openid).then(userDb=>{
                logger.info("search user result:"+JSON.stringify(userDb))
                logger.info("search user result:"+JSON.stringify(userDb.length))
                if (userDb.length>0){
                    resolve(userDb[0].id);
                }else {
                    logger.info("begin add  user to db:"+userInfo.openid)
                    connection.query($sql.insert, [userInfo.openid,userInfo.nickname, userInfo.openid, userInfo.sex, userInfo.openid], function(err, result) {
                        if(err) {
                            logger.info("end add  user to db:"+JSON.stringify(err))
                        }else{
                            //{"fieldCount":0,"affectedRows":1,"insertId":1,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
                            logger.info("end add  user to db:"+JSON.stringify(result))
                        }
                        resolve(result.insertId);
                    });
                }
                connection.release();
            });
        });
    });
    promise.then(function (value) {
        return value;
    }, function (value) {});
    return promise;
    }
var queryAll=function (page,count) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, [page, count], function(err, result) {
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

var queryByOpenid= function (openid) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByOpenid, [openid], function(err, result) {
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
var queryByMobile= function (mobile,password) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByMobile, [mobile,password], function(err, result) {
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
var  update= function (userInfo) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                if(err) {
                    res.send(err);
                }else{
                    res.send('update success');
                }
                connection.release();
            });
        });
    }

module.exports = {update,add,update,queryByOpenid,queryAll,queryByMobile};