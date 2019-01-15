/*
* @Author: linkzz
* @Date:   2019-01-12 17:20:14
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-12 20:38:50
*/
require('./index.css');
var templatePagination = require('./index.string');
var _util = require('util/util.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    // 事件的处理，需要用事件代理的方式
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 若是disabled和active状态的不处理
        if ($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function'
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
};

/**
 * 对象的方法需要在前面添加prototype，这样的话new出来的对象是可以继承方法的
 * 该方法作用是渲染分页组件
 */
Pagination.prototype.render = function(userOption){
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否是一个合法的jQuery对象,这里需要注意：!的优先级高于instanceof，所以需要用括号    
    if (!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页，若只有一页，则该分页组件不必显示
    if (this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};

/**
 * 获取分页html, |上一页| 2 3 4 =5= 6 7 8 |下一页|  5/9       
 */
Pagination.prototype.getPaginationHtml = function(){
    var html = '',
        option = this.option,
        pageArray = [],
        start     = option.pageNum - option.pageRange > 0
            ? option.pageNum - option.pageRange : 1,
        end      = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;
        // 上一页按钮的数据
        pageArray.push({
            name        : '上一页',
            value       : this.option.prePage,
            disabled    : !this.option.hasPreviousPage
        });
        // 数字按钮的处理
        for (var i = start; i <= end; i++){
            pageArray.push({
                name        : i,
                value       : i,
                active      : (i === option.pageNum)
            });
        };
        // 下一页按钮的数据
        pageArray.push({
            name        : '下一页',
            value       : this.option.nextPage,
            disabled    : !this.option.hasNextPage
        });
        // 开始渲染模板
        html = _util.renderHtml(templatePagination, {
            pageArray : pageArray,
            pageNum   : option.pageNum,
            pages     : option.pages
        });
        // 返回渲染好的html
        return html;
};

// 导出模块
module.exports = Pagination;