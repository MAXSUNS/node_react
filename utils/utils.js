/**
 * utils.js
 */
var crypto = require('crypto');
var url = require('url');
var querystring = require('querystring');
var moment = require('moment');
var sha1 = require('sha1');
var utils = {
    isFunction: function(arg) {
        return typeof arg === 'function';
    }
};

/**
 * 加密
 * @param str
 * @param secret
 * @returns {Query|*|{$inc}}
 */
utils.encrypt = function(str, secret) {
    var cipher = crypto.createCipheriv('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

/**
 * 解密
 * @param str
 * @param secret
 * @returns {Query|*|{$inc}}
 */
utils.decrypt = function(str, secret) {
    var decipher = crypto.createDecipheriv('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

/**
 * SHA1签名
 */
utils.sha1 = function(str) {
    var sha1sum = crypto.createHash('sha1');
    sha1sum.update(str, 'utf8');
    str = sha1sum.digest('hex');
    return str;
};

/**
 * MD5签名
 */
utils.md5 = function(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

/**
 * 检查一个字符串是不是数字
 * @param s
 * @returns {boolean}
 */
utils.isNum = function(s) {
    if (s != null && s != "") {
        return !isNaN(s);
    }
    return false;
};

/**
 * 检查一个字符串是不是数字
 * @param config
 * @param req
 * @returns {string}
 */
utils.getSignature = function(config,req) {
    // GET请求携带参数是个参数signature,timestamp,nonce,echostr
    const {signature,timestamp,nonce,echostr} = req;
// 服务器的token
    const token = config.token;
// 将token、timestamp、nonce三个参数进行字典序排序
    const arrSort = [token,timestamp,nonce];
    arrSort.sort();
// 将三个参数字符串拼接成一个字符串进行sha1加密,npm install --save sha1
    const str = arrSort.join("");
    const shaStr = sha1(str);
// 获得加密后的字符串可与signature对比，验证标识该请求来源于微信服务器
    if(shaStr === signature){
        // 确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效
        return echostr
    }else{
        //否则接入失败。
        return ""
    }
};

/**
 * 检查是否是在微信中
 * @param req
 * @returns {boolean}
 */
utils.inMicroMessenger = function(req) {
    return (req.headers['user-agent'] && req.headers['user-agent'].indexOf('MicroMessenger') > -1);
};

/**
 * 检查是否是在移动端
 * @param req
 * @returns {boolean}
 */
utils.inMobile = function(req) {
    var inMobile = false;
    if (req.headers['user-agent']) {
        inMobile = !!req.headers['user-agent'].toLowerCase().match(/(iphone|ipod|ipad|android)/)
    }
    return inMobile;
};

/** * 处理过长的字符串，截取并添加省略号
 * 注：半角长度为1，全角长度为2
 *  **/
utils.autoAddEllipsis = function(pStr, pLen) {
    var _ret = cutString(pStr, pLen);
    var _cutFlag = _ret.cutflag;
    var _cutStringn = _ret.cutstring;
    if ("1" == _cutFlag) {
        return _cutStringn + "...";
    } else {
        return _cutStringn;
    }
};

/*
 * 取得指定长度的字符串
 * 注：半角长度为1，全角长度为2
 *
 * pStr:字符串
 * pLen:截取长度
 *
 * return: 截取后的字符串
 */
function cutString(pStr, pLen) {
    // 原字符串长度
    var _strLen = pStr.length;
    var _tmpCode;
    var _cutString;
    // 默认情况下，返回的字符串是原字符串的一部分
    var _cutFlag = "1";
    var _lenCount = 0;
    var _ret = false;

    if (_strLen <= pLen / 2) {
        _cutString = pStr;
        _ret = true;
    }
    if (!_ret) {
        for (var i = 0; i < _strLen; i++) {
            if (isFull(pStr.charAt(i))) {
                _lenCount += 2;
            } else {
                _lenCount += 1;
            }

            if (_lenCount > pLen) {
                _cutString = pStr.substring(0, i);
                _ret = true;
                break;
            } else if (_lenCount == pLen) {
                _cutString = pStr.substring(0, i + 1);
                _ret = true;
                break;
            }
        }
    }
    if (!_ret) {
        _cutString = pStr;
        _ret = true;
    }
    if (_cutString.length == _strLen) {
        _cutFlag = "0";
    }
    return {"cutstring": _cutString, "cutflag": _cutFlag};
}

//去掉首位空格
utils.trim = function(str) {
    if (!str) {
        return str;
    }
    str = str.replace(/^(\s|\u00A0)+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
};
/*
 * 判断是否为全角
 *
 * pChar:长度为1的字符串
 * return: true:全角
 *        false:半角
 */
function isFull(pChar) {
    if ((pChar.charCodeAt(0) > 128)) {
        return true;
    }
    return false;
}

/** 检查字符串是否以subStr结尾 **/
String.prototype.endWith = function(subStr) {
    if (!subStr) {
        return false;
    }
    if (subStr.length > this.length) {
        return false;
    }
    else {
        return (this.lastIndexOf(subStr) == (this.length - subStr.length));
    }
};

/** 检查字符串是否以subStr开头 **/
String.prototype.startWith = function(subStr) {
    if (!subStr) {
        return false;
    }
    if (subStr.length > this.length) {
        return false;
    }
    else {
        return (this.indexOf(subStr) == 0);
    }
};

String.prototype.replaceAll = function(sptr, sptr1) {
    var that = this;
    while (that.indexOf(sptr) >= 0) {
        that = that.replace(sptr, sptr1);
    }
    return that;
};

/**
 * 用于支持对象合并。
 * @param {Object} target 要合并的目标对象
 * @param {Object} obj 要合并的对象
 */
utils.mixin = function(target, obj) {
    for (var key in obj) {
        if (target.hasOwnProperty(key)) {
            continue;
        }
        target[key] = obj[key];
    }
};

/**
 * 显示时刻
 * @param tick
 * @returns {*}
 */
utils.tickShower = function(tick) {
    if (!tick) {
        return 0;
    }
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = 24 * hour;
    var time = '';
    if (tick >= day) {
        time += parseInt(tick / day) + '天';
        tick %= 24 * 3600 * 1000;
    }
    if (tick >= hour) {
        time += parseInt(tick / hour) + '小时';
        tick %= 3600 * 1000;
    }
    if (tick >= minute) {
        time += parseInt(tick / minute) + '分钟';
        tick %= 60 * 1000;
    }
    if (tick > second) {
        time += parseInt(tick / second) + '秒';
    }
    return time;
};

/**
 * 模糊显示时刻
 * @param tick
 * @returns {*}
 */
utils.fuzzyTickShower = function(tick) {
    if (!tick) {
        return 0;
    }
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = 24 * hour;
    var time = '';
    if (tick > day) {
        time = '少于' + (parseInt(tick / day) + 1) + '天';
        return time;
    }
    if (tick > hour) {
        if (tick == day) {
            time = '1天';
        } else {
            time = '少于' + (parseInt(tick / hour) + 1) + '小时';
        }
        return time;
    }
    if (tick >= minute) {
        time += parseInt(tick / minute) + '分钟';
        tick %= 60 * 1000;
    }
    if (tick > second) {
        time += parseInt(tick / second) + '秒';
    }
    return time;
};

/**
 * 处理查询错误，遇到错误会展示错误界面
 * @param res
 * @param title
 * @param callback
 * @returns {Function}
 */
utils.wrapper = function(res, title, callback) {
    return function(err, data) {
        if (typeof title === 'function') {
            callback = title;
            title = null;
        }
        callback = callback || function() {
        };

        if (!data) {
            err = new Error('无此数据');
        }
        if (err) {
            res.render('info', {title: title || '获取数据失败', message: err.message});
        }
        else {
            return callback(err, data);
        }
    };
};

/**
 * 获取客户端IP
 * @param req
 * @returns {*}
 */
utils.getClientIp = function(req) {
    return (req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress).match(/\d+\.\d+\.\d+\.\d+/);
};

utils.check_digest = function(query, secret) {
    var digest = this.create_digest(query, secret);

    //console.log('digest:' + digest);

    var sign = query.signature;

    return (sign && sign == digest);
};

utils.create_digest = function(query, secret) {
    //console.log('Xquery:' + JSON.stringify(query));
    //console.log('Xkey:' + secret);

    var queries = new Array();
    for (var key in query) {
        if (key.toLowerCase() != 'signature') {
            queries.push(query[key]);
        }
    }

    queries.push(secret);

    //console.log('queries:' + JSON.stringify(queries));
    var s = queries.sort().join('');

    //console.log('source:' + s);
    //
    //console.log('X:' + this.sha1(s.toLowerCase()));

    //将值排序并合并为一个字符串
    return this.sha1(s);
};

/**
 * 验证sign
 * @param  {object} req     request对象
 * @param  {string} secretKey 应用的secretKey
 * @returns {q.signature|*|wrap.signature|boolean}
 */
utils.checkSign = function(req, secretKey) {
    var sign = req.query.signature || req.body.signature || req.headers['signature'];

    //对params里的value进行排序
    var arrValue = [];
    if (req.method === 'POST') {
        for (var key in req.body) {
            if (key.toLowerCase() != 'signature') {
                arrValue.push(req.body[key]);
            }
        }
    }
    var digest = this._generateSign(req.method, req.originalUrl, arrValue, secretKey);

    //console.log('digest:' + digest);

    return (sign && sign === digest);
};

utils._generateSign = function(method, path, arrValue, secretKey) {
    //将method转为大写
    method = method.toUpperCase();
    if (method !== 'GET' && method !== 'POST') {
        throw new Error('method is invalid');
    }

    //logger.trace(path);

    var urlParams = url.parse(path);
    var host = urlParams.host;
    var path = urlParams.pathname;

    //把URL中的所有参数都加进来
    var queries = querystring.parse(urlParams.query);
    for (var key in queries) {
        if (key.toLowerCase() != 'signature') {
            arrValue.push(queries[key]);
        }
    }

    arrValue.push(secretKey);
    arrValue.push(path);
    arrValue.push(method);
    arrValue.sort();

    console.log(arrValue);
    var s = arrValue.sort().join('');

    //console.log('sources:' + s);

    return this.sha1(s);
};

/**
 * 生成sign
 *
 * 将urlpath、除签名字段外的所有参数、请求方法和secretKey放在同一数组中排序后组成字符串作为源串进行签名
 *
 * @param  {string} path      url里的path路径
 * @param  {object} params    参数对象
 * @param  {string} method    请求方法，GET或POST
 * @param  {string} secretKey 应用的secretKey
 * @return {string}           生成的sign
 */
utils.generateSign = function(path, params, method, secretKey) {
    if (typeof params !== 'object') {
        throw new Error('params is invalid');
    }

    //对params里的value进行排序
    var arrValue = [];
    for (var key in params) {
        if (key.toLowerCase() != 'signature') {
            arrValue.push(params[key]);
        }
    }
    return this._generateSign(method, path, arrValue, secretKey);
};

/**
 * 获取当天，本周，本月的开始时间和结束时间段
 * @param t 当天：day, 本周：week,本月 month
 */
utils.getCurrentPeriod = function(t) {
    if (t === 'day') {
        return {
            start_at: moment().startOf('day'),
            end_at: moment().endOf('day')
        }
    } else if (t === 'week') {
        //老外的星期是从周日开始算，所以我们的要加1
        return {
            start_at: moment().startOf('week').add(1, 'day'),
            end_at: moment().endOf('week').add(1, 'day')
        };
    } else if (t === 'month') {
        return {
            start_at: moment().startOf('month'),
            end_at: moment().endOf('month')
        }
    }
    return null;
};
/**
 * 判断手机号是否合法
 * @param str
 * @returns boolean
 */
utils.isValidPhone =  function (str) {
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    return myreg.test(str);
}

/**
 * response格式化
 * @param data
 * @returns obj
 */
utils.responseForm =  function (data,code) {
    return {"code":code,"data":data};
}
module.exports = utils;
