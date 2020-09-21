var goods = {
    updateGoods:'update litemall_goods set name=? where id=?',
    delete: 'delete from litemall_goods where id=?',
    queryByGoodsid: 'select * from litemall_goods where id=?',
    queryAll: 'select * from litemall_goods limit ?,?'
};

module.exports = goods;