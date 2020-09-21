var user = {
    updateMobile:'update litemall_order_goods set mobile=? where id=?',
    delete: 'delete from litemall_order_goods where id=?',
    queryByOrderid: 'select * from litemall_order_goods where order_id=?',
    queryAll: 'select * from litemall_order_goods limit ?,?'
};

module.exports = user;