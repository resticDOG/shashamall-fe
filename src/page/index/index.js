/*
* @Author: linkzz
* @Date:   2018-12-24 17:02:29
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-08 10:53:56
*/
// css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');
// header模板
require('page/common/header/index.js');
// slider组件
require('util/slider/index');
// 工具类
var _util = require('util/util.js');
// banner模板
var templateBanner = require('./banner.string');

// 初始化slider
$(function() {
    // 渲染轮播图的html模板
    var htmlBanner = _util.renderHtml(templateBanner);
    $('.banner-con').html(htmlBanner);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots : true
    });
    // 前一张和后一张按钮的绑定
    $('.banner-con .banner-arrow').click(function(){
        // 通过类名判断方向
        var forword = $(this).hasClass('prev') ? 'prev' : 'next';
        // 调用插件提供的方法
        $slider.data('unslider')[forword]();
    });
});
