/*
* @Author: linkzz
* @Date:   2019-01-20 16:02:19
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-27 23:02:08
*/
// 工具类
var util = require('util/util.js');

var order = {
    /**
     * 获取购物车中的货物数量
     */
    getProductList : function(resolve, reject){
        util.http({
            url     : util.getServerUrl('/order/get_order_cart_product.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    /**
     * 创建订单
     */
    createOrder : function(shippingId,resolve, reject){
        util.http({
            url     : util.getServerUrl('/order/create.do'),
            data    : {
                shippingId : shippingId
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 获取订单列表
     */
    getOrderList : function(listParam,resolve, reject){
        util.http({
            url     : util.getServerUrl('/order/list.do'),
            data    : listParam,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 获取单个订单的详情
     */
     getOrderDetail : function(orderNo,resolve, reject){
        util.http({
            url     : util.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNo
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 取消指定订单
     */
     CancelOrder : function(orderNo,resolve, reject){
        util.http({
            url     : util.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNo
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
}

module.exports = order;