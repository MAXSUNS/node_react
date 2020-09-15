var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var $sql = require('./userSql');

var pool = mysql.createPool( config.sqlConfig );

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;

            connection.query($sql.insert, [param.name, param.age], function(err, result) {
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
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                if(err) {
                    res.send(err);
                }else{
                    res.send(result);
                }
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;

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