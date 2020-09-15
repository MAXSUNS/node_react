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
module.exports = {sqlConfig,wx};