/*
* @Author: linkzz
* @Date:   2018-12-24 17:02:29
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-14 21:44:59
*/
// 自身css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');
// header模板
require('page/common/header/index.js');
// 工具类
var _util           = require('util/util.js');
// product-service
var _product        = require('service/product-service.js');
// cart-service
var _cart           = require('service/cart-service.js');

// 引入自定义html模板
var templateIndex   = require('./index.string');

// 页面的逻辑部分
var page = {
    // 全局数据对象
    data : {
        productId : _util.getUrlParam('productId') || ''
    },
    /**
     * 初始化方法
     */
    init : function () {
        this.onLoad();
        this.bindEvent();
    },

    /**
     * 加载list页模板
     */
    onLoad : function(){
        // 如果没有传productId,自动跳回首页
        if (!this.data.productId){
            _util.goHome();
        }
        this.loadDetail();
    },

    /**
     * 绑定事件
     */
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // 加减数量
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if (type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val()
            }, function(res){
                // 跳转到成功提示页
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _util.errorTips(errMsg);
            });
        });
    },

    /**
     * 加载商品详细信息
     */
     loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求商品详情的接口
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 缓存接口中返回的数据
            _this.data.detailInfo = res;
            html = _util.renderHtml(templateIndex, res);
            // 渲染html
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">找不到商品</p>');
        })
     },

     /**
      * 处理返回的图片字符串
      */
     filter : function(data){
        data.subImages = data.subImages.split(',');
     }
    
    
}

// 执行init方法
$(function(){
    page.init();
});

