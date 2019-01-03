/*
* @Author: linkzz
* @Date:   2019-01-03 10:11:46
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-03 11:13:00
*/
// css文件
require('./index.css');

// 工具类
var _util = require('util/util.js');

// 引入nav-simple模板
require('page/common/nav/index.js');
require('page/common/nav-simple/index.js');

/**
 * 页面的逻辑-根据url里type的值判断需要显示的操作板块
 */
$(function(){
    // 取出type
    var type = _util.getUrlParam('type') || 'default';
    // 选取对应的div类并显示出来
    var $element = $('.' + type + '-success');
    $element.show();
});