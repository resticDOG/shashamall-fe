/*
* @Author: linkzz
* @Date:   2018-12-30 16:30:48
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-16 19:37:06
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
    },

    addToCart : function(productInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/add.do'),
            data    : productInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 获取购物车列表
     */
    getCartList : function(resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/list.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 全选商品
     */
     selectAllProduct : function(resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/select_all.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
     },

     /**
      * 取消全选
      */
      unSelectAllProduct : function(resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/un_select_all.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
     },

     /**
      * 选中购物车商品
      */
      selectProduct : function(productId, resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/select.do'),
            method  : 'GET',
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
     },

     /**
      * 取消商品选中状态
      */
      unSelectProduct : function(productId, resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/un_select.do'),
            method  : 'GET',
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
     },

     /**
      * 更新购物车商品数量
      */
      updateProduct : function(productInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/update.do'),
            method  : 'GET',
            data    : productInfo,
            success : resolve,
            error   : reject
        });
     },

     /**
      * 删除商品，支持批量，id以,连接
      */
      deleteCartProduct : function(productIds, resolve, reject){
        util.http({
            url     : util.getServerUrl('/cart/delete_product.do'),
            method  : 'GET',
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
     },
}

module.exports = cart;