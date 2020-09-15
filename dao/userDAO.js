var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var $sql = require('./userSql');

var pool = mysql.createPool( config.sqlConfig );

module.exports = {
    add: function (userInfo) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [userInfo.nickname, userInfo.password, userInfo.gender, userInfo.openid], function(err, result) {
                if(err) {
                    res.send(err);
                }else{
                    res.send('add success');
                }

                // 释放连接
                connection.release();
            });
        });
    },
    queryAll: function (page,count) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, [page, count], function(err, result) {
                if(err) {
                    res.send(err);
                }else{
                    res.send(result);
                }
                connection.release();
            });
        });
    },
    queryByOpenid: function (openid) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByOpenid, [openid], function(err, result) {
                if(err) {
                    res.send(err);
                }else{
                    res.send(result);
                }
                connection.release();
            });
        });
    },
    update: function (userInfo) {
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
};