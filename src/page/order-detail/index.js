/*
* @Author: linkzz
* @Date:   2019-01-27 16:01:23
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-27 23:03:42
*/
// 自身css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');

// header模板
require('page/common/header/index.js');

// 工具类
var _util           = require('util/util.js');
// nav-side模板
var navSide         = require('page/common/nav-side/index.js');
// user-service
var _order          = require('service/order-service.js');
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
        this.bindEvent();
    },

    onLoad : function(){
        // 加载左侧导航条
        navSide.init({
            name : 'order-list'
        });
        this.loadDetail();
    },

    /**
     * 绑定事件
     * @return {[type]} [description]
     */
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.order-cancel', function(){
            if (window.confirm('确认取消该订单？')){
                _order.CancelOrder(_this.data.orderNo, function(res){
                    // 订单取消成功
                    _util.successTips('订单取消成功!');
                    _this.loadDetail();
                }, function(errMsg){
                    // 订单取消失败
                    _util.errorTips('订单取消失败,请刷新重试。');
                });
            }
        });
    },

    // 加载订单列表
    loadDetail : function(){
        var _this           = this,
            orderDetailHtml = '<div class="loading"></div>',
            $content        = $('.content');
        // 添加loading图片
        $content.html(orderDetailHtml);
        _order.getOrderDetail(this.data.orderNo, function(res){
            // 数据适配
            _this.dataFilter(res);
            // 渲染模板
            orderDetailHtml = _util.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
            // 加载分页信息
        }, function(errMsg){
            // 显示失败信息
            $content.html('<p class="err-tip>' + errMsg + '</p>"');
        })
    },

    /**
     * 给数据动态添加属性
     */
    dataFilter : function(data){
        data.needPay        = data.status === 10;
        data.isCancelable   = data.status === 10;
    }

}

// 执行init方法
$(function(){
    page.init();
});


