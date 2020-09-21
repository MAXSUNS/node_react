var order = {
    updateMobile:'update litemall_order set order_status=? where id=?',
    delete: 'delete from litemall_order where id=?',
    queryByUserid: 'select * from litemall_order where user_id=?',
    queryAll: 'select * from litemall_order limit ?,?'
};

module.exports = order;