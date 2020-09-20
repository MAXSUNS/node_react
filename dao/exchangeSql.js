var user = {
    insert:'INSERT INTO litemall_user( username,nickname,password,gender, weixin_openid) VALUES(?,?,?,?,?)',
    updateUser:'update litemall_user set username=?, password=? where id=?',
    updateMobile:'update litemall_user set mobile=? where id=?',
    delete: 'delete from litemall_user where id=?',
    queryByOpenid: 'select * from litemall_user where weixin_openid=?',
    queryAll: 'select * from litemall_user limit ?,?'
};

module.exports = user;