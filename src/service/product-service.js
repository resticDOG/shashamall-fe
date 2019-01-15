/*
* @Author: linkzz
* @Date:   2019-01-08 11:53:03
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-14 19:56:48
*/
//和商品模块接口对接的service
//工具类
var util = require('util/util.js');

//输出的product模块
var _product = {

    /**
     * 模块提供的获取商品列表方法
     * @param  {function} resolve [请求成功的处理函数，该函数包含一个res参数及请求成功返回的数据data和提示信息msg]
     * @param  {function} reject  [请求失败的处理函数，该函数包含失败信息msg]
     * @param {Object} listInfo 包含分页信息，关键词等信息的对象
     */
    getProducts : function(listInfo, resolve, reject){
        // 实质就是发起一个ajax请求
        util.http({
            url     : util.getServerUrl('/product/list.do'),
            data    : listInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 获取商品详情
     */
    getProductDetail : function(productId, resolve, reject){
        // 实质就是发起一个ajax请求
        util.http({
            url     : util.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }

}

//输出
module.exports = _product;