/*
* @Author: linkzz
* @Date:   2019-01-28 15:38:27
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-28 18:10:14
*/
// 自身css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');

// header模板
require('page/common/header/index.js');

// 工具类
var _util           = require('util/util.js');
// user-service
var _payment        = require('service/payment-service.js');
// 引入自定义html模板
var templateIndex   = require('./index.string');

// 页面的逻辑部分
var page = {
    data : {
        orderNo : _util.getUrlParam('orderNo')
    },
    /**
     * 初始化方法
     */
    init : function () {
        this.onLoad();
    },

    onLoad : function(){
        this.loadPaymentInfo();
    },


    // 加载订单列表
    loadPaymentInfo : function(){
        var _this           = this,
            paymentInfoHtml = '<div class="loading"></div>',
            $pageWrap        = $('.page-wrap');
        // 添加loading图片
        $pageWrap.html(paymentInfoHtml);
        _payment.orderPay(this.data.orderNo, function(res){
            // 渲染模板
            paymentInfoHtml = _util.renderHtml(templateIndex, res);
            $pageWrap.html(paymentInfoHtml);
            // 监听订单状态
            _this.listenOrderStatus();
        }, function(errMsg){
            // 显示失败信息
            $pageWrap.html('<p class="err-tip>' + errMsg + '</p>"');
        })
    },

    /**
     * 轮训查询订单支付状态
     */
    listenOrderStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNo, function(res){
                // 如果后端返回data=true即表示订单支付成功
                if (res == true){
                    // 跳转支付成功结果页
                    window.location.href = './result.html?type=payment&orderNo=' + _this.data.orderNo;
                }
            });
        }, 5e3);
    }
}

// 执行init方法
$(function(){
    page.init();
});


