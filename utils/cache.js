let redis = require("redis");
var config = require('../config');
var red=config.redis;
const redis_client = redis.createClient({host:red.host,port:red.port,ttl:red.ttl});

redis_client.auth('6478**12',function(){
    console.log('auth success');
});
redis_client.on("error",function(err){
    console.log(err);
});
redis = {};
redis.set = function(key,value){
    value = JSON.stringify(value);
    return redis_client.set(key,value,function(err){
        //console.log(err);
    });
};
text = async(key)=>{
    doc = await new Promise((resolve)=>{
        redis_client.get(key,function(err,res){
            return resolve(res);
        });
    });
    doc = JSON.parse(doc);
    return doc;
}

redis.get = async(key)=>{
    const ret  = await text(key);
    return ret;
}

module.exports = redis;;