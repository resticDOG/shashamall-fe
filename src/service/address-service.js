/*
* @Author: linkzz
* @Date:   2019-01-21 16:19:53
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-23 22:02:39
*/
// 工具类
var util = require('util/util.js');

var address = {
    /**
     * 获取地址列表
     */
    getAddressList : function(resolve, reject){
        util.http({
            url     : util.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    // 添加单条地址
    addAddress : function(receiverInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/shipping/add.do'),
            data    : receiverInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    // 根据id获取地址详情
    getAddressById : function(shippingId, resolve, reject){
        util.http({
            url     : util.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    // 更新地址
    updateAddress : function(receiverInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/shipping/update.do'),
            data    : receiverInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    // 删除地址，需要传递id
    deleteAddress : function(shippingId, resolve, reject){
        util.http({
            url     : util.getServerUrl('/shipping/delete.do'),
            data    : {
                shippingId : shippingId
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
}

module.exports = address;