/*
* @Author: linkzz
* @Date:   2018-12-29 15:52:34
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-04 12:10:24
*/
// 样式
require('./index.css');

// 工具类
var _util = require('util/util.js');
// user-service
var _user = require('service/user-service.js');
// cart-service
var _cart = require('service/cart-service.js');

var nav = {
    //初始化
    init : function(){
        // 绑定事件
        this.bindEvent();
        // 获取用户信息
        this.loadUserInfo();
        // 获取购物车货物数量
        this.loadCartCount();
        // 将对象返回
        return this;
    },
    /**
     * 事件绑定方法
     */
    bindEvent : function(){
        // 让登录span具备跳转功能
        $('.js-login').click(function(){
            _util.doLogin();
        });
        // 登出
        $('.js-logout').click(function(){
            // 点击logout之后需要调用后端接口
            _user.logout(function(res){
                // 若登出成功，返回首页
                window.location.href = './index.html';
            },function(errMsg){
                _util.errorTips(errMsg);
            });
        });
        // 注册
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });

    },
    /**
     * 加载用户信息
     */
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            //用户是登录状态,未登录板块不显示
            $('.not-login').hide()
            .siblings('.login').show()//兄弟节点
            .find('.username').text(res.username);//查找子节点病修改为用户名
        }, function(errMsg){
            //用户登录失败，不做任何反应
        });
    },
    /**
     * 加载购物车数量
     */
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            //成功获取购物车数量，显示在页面中
            $('.nav-cart-count').text(res || 0);
        }, function(errMsg){
            //错误则显示0
            $('.nav-cart-count').text(0);
        });
    }
}

// 需要对外提供的就是初始化方法
module.exports = nav.init();