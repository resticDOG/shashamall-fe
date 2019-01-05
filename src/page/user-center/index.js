/*
* @Author: linkzz
* @Date:   2018-12-24 17:02:29
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-05 20:14:10
*/
// 自身css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');

// header模板
require('page/common/header/index.js');

// 工具类
var _util            = require('util/util.js');
// nav-side模板
var navSide         = require('page/common/nav-side/index.js');
// user-service
var _user           = require('service/user-service.js');
// 引入自定义html模板
var templateIndex   = require('./index.string');

// 页面的逻辑部分
var page = {
    /**
     * 初始化方法
     */
    init : function () {
        /* body... */
        this.onLoad();
    },

    onLoad : function(){
        // 加载左侧导航条
        navSide.init({
            name : 'user-center'
        });
        // 初始化用户信息
        this.loadUserInfo();
    },

    /**
     * 初始化用户信息
     */
    loadUserInfo : function(){
        var userHtml = '';
        // 从接口获取数据并渲染到html模板中
        _user.checkLogin(function(res){
            // 获取成功，渲染模板
            userHtml = _util.renderHtml(templateIndex, res);
            // 将模板放入容器中
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            // 获取失败，显示错误信息
            _util.errorTips(errMsg);
        });
    }
}

// 执行init方法
$(function(){
    page.init();
});

