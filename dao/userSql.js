var user = {
    insert:'INSERT INTO user( nickname,password,gender, weixin_openid) VALUES(?,?,?,?)',
    updateUser:'update user set username=?, password=? where id=?',
    updateMobile:'update user set mobile=? where id=?',
    delete: 'delete from user where id=?',
    queryByOpenid: 'select * from user where weixin_openid=?',
    queryAll: 'select * from user limit ?,?'
};

module.exports = user;