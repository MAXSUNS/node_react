var order = {
    insert:'insert into litemall_order ( user_id, consignee,mobile, address,goods_price) values (?,?,?,?,?)',
    updateAddress:'update litemall_order set consignee=?,mobile=?,address=? where id=?',
    delete: 'delete from litemall_order where id=?',
    queryByUserid: 'select a.*,b.goods_name,b.pic_url from litemall_order a left join litemall_order_goods b on a.id = b.order_id where a.user_id=? group by a.id',
    queryAll: 'select * from litemall_order limit ?,?',
    queryByOrderid: 'select * from litemall_order where id=?'
};

module.exports = order;