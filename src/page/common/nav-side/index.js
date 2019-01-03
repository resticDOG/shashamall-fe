/*
* @Author: linkzz
* @Date:   2019-01-02 22:42:08
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-03 00:19:57
*/
// 样式
require('./index.css');

// 工具类
var _util = require('util/util.js');

// 引入nav-side模板
var templateIndex = require('./index.string');


var navSide = {
    // 默认的option对象
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href : './user-center.html'},
            {name : 'order-list', desc : '我的订单', href : './order-list.html'},
            {name : 'pass-update', desc : '修改密码', href : './pass-update.html'},
            {name : 'about', desc : '关于商城', href : './about.html'},
        ]
    },

    //初始化渲染导航菜单，通过外部传入的option对象
    init : function(option){
        // 引用jQuery的extend方法合并对象
        $.extend(this.option, option);
        // 渲染导航菜单
        this.randerNav();
    },
    /**
     * 通过传入的数据，渲染导航模板
     */
    randerNav : function(){
        // 计算active数据
        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if (this.option.navList[i].name === this.option.name){
                // 若传入的name匹配到列表界面的name,则增加isActive属性
                this.option.navList[i].isActive = true; 
            }
        };
        // 渲染数据
        var navHtml = _util.renderHtml(templateIndex,{
            navList : this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    }
};

// 需要对外提供的就是初始化方法
module.exports = navSide;