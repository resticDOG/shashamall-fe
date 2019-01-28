/*
* @Author: linkzz
* @Date:   2019-01-20 16:00:35
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-23 22:31:17
*/
// 自身css
require('./index.css');
// header模板
require('page/common/header/index.js');
// 引入nav-simple模板
require('page/common/nav/index.js');
// 工具类
var _util           = require('util/util.js');
// cart-service
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
// 地址添加模块
var addressModal    = require('./address-modal.js');
// 引入自定义html模板
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');

// 页面的逻辑部分
var page = {
    // 全局数据对象
    data : {
        selectedAddressId : null
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
        this.loadAddressList();
        this.loadProductList();
    },

    /**
     * 绑定事件
     */
    bindEvent : function(){
        var _this = this;
        // 地址选中
        $(document).on('click', '.address-item', function(){
            // 选中的元素添加active类，其他元素的active类去掉
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            // 缓存选中的addr-id
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 订单提交
        $(document).on('click', '.order-submit', function(){
            // 选中的元素添加active类，其他元素的active类去掉
            var shippingId = _this.data.selectedAddressId;
            if (shippingId){
                _order.createOrder(shippingId, function(res){
                    window.location.href = './payment.html?orderNo=' + res.orderNo;
                }, function(errMsg){
                    _util.errorTips(errMsg);
                })
            } else {
                // shippingId无效
                _util.errorTips('请选择地址后再提交');
            }
        });

        // 添加地址
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate  : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            });
        });

        // 编辑地址
        $(document).on('click', '.address-update', function(event){
            // 阻止事件冒泡
            event.stopPropagation();
            // 获取编辑那条地址的id
            var shippingId = $(this).parents('.address-item').data('id');
            // 调用service从服务器获取该条id的详情
            _address.getAddressById(shippingId, function(res){
                // 获取成功之后将信息回显
                addressModal.show({
                    isUpdate : true,
                    data     : res,
                    onSuccess : function(){
                        _this.loadAddressList();
                    }
                })
            }, function(errMsg){
                _util.errorTips(errMsg);
            })
        });

        // 删除地址
        $(document).on('click', '.address-delete', function(event){
            // 阻止事件冒泡
            event.stopPropagation();
            // 获取编辑那条地址的id
            var shippingId = $(this).parents('.address-item').data('id');
            // 弹窗确认
            if (window.confirm('确认要删除这条地址？')){
                _address.deleteAddress(shippingId, function(res){
                _util.successTips('删除地址成功！');
                // 显示列表
                _this.loadAddressList();
                }, function(errMsg){
                _util.errorTips(errMsg);
                })
            }
        });
    },

    /**
     * 加载商品列表
     */
    loadProductList : function(){
        var _this = this;
        // 添加loading图片
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res){
            var productListHtml = _util.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">商品列表加载失败，请刷新后重试</p>');
        })
    },

    /**
     * 加载地址列表
     */
    loadAddressList : function(){
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _util.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址列表加载失败，请刷新后重试</p>');
        })
    },

    // 遍历list判断list中是否有已经缓存好的selectedId,若有，在list中添加一个isActive字段
    addressFilter : function(data){
        if (this.data.selectedAddressId){
            // 已经选中了某个地址
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++){
                if (this.data.selectedAddressId === data.list[i].id){
                    // 列表中的id还存在
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            if (!selectedAddressIdFlag){
                // 即之前选中的id已经被删除了
                this.data.selectedAddressId = null;
            }
        }
    }

}

// 执行init方法
$(function(){
    page.init();
});

