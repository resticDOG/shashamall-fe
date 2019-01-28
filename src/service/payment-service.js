/*
* @Author: linkzz
* @Date:   2019-01-28 15:43:30
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-28 18:11:46
*/
// 工具类
var util = require('util/util.js');

var payment = {
    /**
     * 支付指定订单，
     * 后端会返回二维码
     */
    orderPay : function(orderNo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/order/pay.do'),
            method  : 'GET',
            data    : {
                orderNo : orderNo
            },
            success : resolve,
            error   : reject
        });
    },

    getPaymentStatus : function(orderNo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/order/query_order_pay_status.do'),
            method  : 'GET',
            data    : {
                orderNo : orderNo
            },
            success : resolve,
            error   : reject
        });
    },
    
}

module.exports = payment;