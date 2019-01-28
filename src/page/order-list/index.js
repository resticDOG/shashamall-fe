/*
* @Author: linkzz
* @Date:   2019-01-23 23:17:59
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-24 00:31:08
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
// 分页组件类
var Pagination      = require('util/pagination/index.js');
// user-service
var _order          = require('service/order-service.js');
// 引入自定义html模板
var templateIndex   = require('./index.string');

// 页面的逻辑部分
var page = {
    data : {
        listParam : {
            pageNum  : 1,
            pageSize : 10
        }
    },
    /**
     * 初始化方法
     */
    init : function () {
        this.onLoad();
    },

    onLoad : function(){
        // 加载左侧导航条
        navSide.init({
            name : 'order-list'
        });
        this.loadOrderList();
    },

    // 加载订单列表
    loadOrderList : function(){
        var _this           = this,
            orderListHtml   = '<div class="loading"></div>',
            $orderListCon   = $('.order-list-con');
        // 添加loading图片
        $orderListCon.html(orderListHtml);
        _order.getOrderList(this.data.listParam, function(res){
            // 渲染模板
            orderListHtml = _util.renderHtml(templateIndex, res);
            $orderListCon.html(orderListHtml);
            // 加载分页信息
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            // 显示失败信息
            $orderListCon.html('<p class="err-tip>加载订单失败，请刷新后重试</p>"');
        })
    },

    /**
     * 加载分页信息
     */
    loadPagination : function(pageInfo){
        var _this = this;
        // 创建一个类实例 
        this.pagination ? '' : (this.pagination = new Pagination());
        // 调用对象的渲染方法
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    },

}

// 执行init方法
$(function(){
    page.init();
});

