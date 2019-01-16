/*
* @Author: linkzz
* @Date:   2019-01-15 22:13:27
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-16 20:57:27
*/
// 自身css
require('./index.css');
// header模板
require('page/common/header/index.js');
// 引入nav-simple模板
var nav             = require('page/common/nav/index.js');
// 工具类
var _util           = require('util/util.js');
// cart-service
var _cart           = require('service/cart-service.js');
// 引入自定义html模板
var templateIndex   = require('./index.string');

// 页面的逻辑部分
var page = {
    // 全局数据对象
    data : {
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
        this.loadCart();
    },

    /**
     * 绑定事件
     */
    bindEvent : function(){
        var _this = this;
        // 商品的选择 / 取消选择
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                // 查找自己的父级元素一直查到符合类选择器的类为止
                productId = $this.parents('.cart-table').data('product-id');
            // 切换选中状态
            if ($this.is(':checked')){
                // 需要选中操作
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                })
            } else {
                // 需要取消选中操作
                _cart.unSelectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                })
            }
        });

        // 商品的全选 / 取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            // 切换选中状态
            if ($this.is(':checked')){
                // 需要选中操作
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                })
            } else {
                // 需要取消选中操作
                _cart.unSelectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                })
            }
        });
        // 商品数量的变化
        $(document).on('click', '.count-btn', function(){
            // 变量
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if ('plus' === type){
                // 点击的+号
                if (currCount >= maxCount){
                    _util.errorTips('该商品数量已达上限');
                    return;
                }
                newCount = currCount + 1;
            } else if ('minus' === type) {
                if (currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            // 开始更新商品数量
            _cart.updateProduct({
                productId   : productId,
                count       : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showCartError();
            });

        });

        // 删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if (window.confirm('确认删除该商品？')){
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        
        // 删除选中商品
        $(document).on('click', '.delete-selected', function(){
            var arrProductIds = [],
                //表示所有选中的元素集合
                $selectedItems = $('.cart-select:checked');
            if ($selectedItems.length){
                if (window.confirm('确认删除选中的商品？')){
                    // 遍历元素并取出id
                    for (var i = 0, iLength = $selectedItems.length; i < iLength; i++){
                        // 此时的对象不是jQuery对象，所以需要转换成jq对象
                        arrProductIds.push($($selectedItems[i]).parents('.cart-table').data('product-id'));
                    }
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
            } else {
                // 提示还未选中商品
                _util.errorTips('您还未选择任何商品！');
            }
        });

        /**
         * [提交购物车]
         */
        $(document).on('click', '.btn-submit', function(){
            // 根据商品总价判断是否有商品被选中
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                // 跳转到订单确认页
                window.location.href = './confirm.html';
            } else {
                _util.errorTips('请选择商品后再提交');
            }
        });
    },

    /**
     * 加载购物车
     */
     loadCart : function(){
        var _this       = this;
        // 请求购物车列表
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            // 提示失败
            _this.showCartError();
        })
     },

     /**
      * 渲染购物车
      */
     renderCart : function(data){
        // 验证信息
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        // 生成html
        var cartHtml = _util.renderHtml(templateIndex, data);
        // 将html放到容器中
        $('.page-wrap').html(cartHtml);
        // 通知导航条模块购物车更新购物车数量
        nav.loadCartCount();
     },

    /**
    * 单独或批量删除商品，productId用“,”连接
    */
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteCartProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        })
    },

    /**
     * 验证返回数据是否为空
     */
    filter : function(data){
        // 给data增加一个字段来标示购物车的商品列表是否为空，当数组元素为0时notEmpty是false，表示购物车是空的
        data.notEmpty = !!data.cartProductVoList.length;
    },

    /**
     * 显示购物车错误信息
     */
    showCartError : function(){
        $('.page-wrap').html('<p class="err-tip">出现了宇宙洪荒级的错误^_^～～刷新试试？</p>');
    }    
}

// 执行init方法
$(function(){
    page.init();
});

