'use strict';
var sqlConfig ={
  host:'host',
  user:'user',
  password:'password',
  database:'database',
  port: 3306
}
var wx ={
  appid: 'appid',
  appsecret: 'appsecret',
  token:'token',
  // encodingAESKey:'PLhyMCfZyfWQqwJSHFnZgFH4Z7v1hO3ID3ZGSL57ix',
  checkSignature: true
}

var redis ={
  host: '127.0.0.1',
  port: '6379',
  ttl: 5*60*1000
}
module.exports = {sqlConfig,wx,redis};