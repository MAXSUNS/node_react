var exchange = {
    queryByCode: 'select * from litemall_exchange_card where code=? and password =?',
    updateExchange:'update litemall_exchange_card set user_id=?,status=? where code=?',
};

module.exports = exchange;