/*
* @Author: linkzz
* @Date:   2019-02-03 16:40:19
* @Last Modified by:   linkzz
* @Last Modified time: 2019-02-03 17:10:51
*/
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');

// header模板
require('page/common/header/index.js');

// 工具类
var _util           = require('util/util.js');
// nav-side模板
var navSide         = require('page/common/nav-side/index.js');

// 页面的逻辑部分
var page = {
    /**
     * 初始化方法
     */
    init : function () {
        this.onLoad();
    },

    onLoad : function(){
        // 加载左侧导航条
        navSide.init({
            name : 'about'
        });
    },
}

// 执行init方法
$(function(){
    page.init();
});

