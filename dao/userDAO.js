var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var $sql = require('./userSql');

var pool = mysql.createPool( config.sqlConfig );
const log4js = require('../utils/log4js');
const logger = log4js.getLogger();

var add=function (userInfo) {
        pool.getConnection(function(err, connection) {
            logger.info("add user :"+JSON.stringify(userInfo))
            let result=queryByOpenid(userInfo.openid);
            logger.info("search result:"+JSON.stringify(result))
            if (result){
                return 'add success';
            }
            connection.query($sql.insert, [userInfo.nickname, userInfo.password, userInfo.gender, userInfo.openid], function(err, result) {

                // 释放连接
                connection.release();
                if(err) {
                    return err
                }else{
                    return 'add success';
                }

            });
        });
    }
var queryAll=function (page,count) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, [page, count], function(err, result) {
                connection.release();
                if(err) {
                    return err
                }else{
                    return result;
                }
            });
        });
    }
var queryByOpenid= function (openid) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByOpenid, [openid], function(err, result) {
                connection.release();
                if(err) {
                    return err
                }else{
                    return result;
                }
            });
        });
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

module.exports = {update,add,update,queryByOpenid,queryAll};