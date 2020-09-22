var user = {
    insert:'insert into litemall_order_goods (order_id, goods_id, goods_name, number) values (?,?,?,?)',
    batchInsert:'insert into litemall_order_goods (order_id, goods_id, goods_name, number) values ?',
    updateMobile:'update litemall_order_goods set mobile=? where id=?',
    delete: 'delete from litemall_order_goods where id=?',
    queryByOrderid: 'select * from litemall_order_goods where order_id=?',
    queryAll: 'select * from litemall_order_goods limit ?,?'
};

module.exports = user;