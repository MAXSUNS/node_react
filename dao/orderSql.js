var order = {
    insert:'insert into litemall_order ( user_id, consignee,mobile, address) values (?,?,?,?)',
    updateAddress:'update litemall_order set consignee=?,mobile=?,address=? where id=?',
    delete: 'delete from litemall_order where id=?',
    queryByUserid: 'select * from litemall_order where user_id=?',
    queryAll: 'select * from litemall_order limit ?,?'
};

module.exports = order;