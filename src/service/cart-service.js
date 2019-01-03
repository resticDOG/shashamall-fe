/*
* @Author: linkzz
* @Date:   2018-12-30 16:30:48
* @Last Modified by:   linkzz
* @Last Modified time: 2018-12-30 16:33:06
*/
// 工具类
var util = require('util/util.js');

var cart = {
    /**
     * 获取购物车中的货物数量
     */
    getCartCount : function(resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/get_cart_product_count.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = cart;