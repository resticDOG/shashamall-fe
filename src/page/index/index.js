/*
* @Author: linkzz
* @Date:   2018-12-24 17:02:29
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-03 10:33:10
*/
// 工具类
var util = require('util/util.js');

// 引入nav-simple模板
require('page/common/nav/index.js');

// header模板
require('page/common/header/index.js');

// nav-side模板
var navSide = require('page/common/nav-side/index.js');

navSide.init({
    name : 'pass-update'
});

