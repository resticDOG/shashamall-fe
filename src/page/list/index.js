/*
* @Author: linkzz
* @Date:   2018-12-24 17:02:29
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-13 15:05:45
*/
// 自身css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');
// header模板
require('page/common/header/index.js');
// 工具类
var _util           = require('util/util.js');
// product-service
var _product        = require('service/product-service.js');
// 分页组件类
var Pagination      = require('util/pagination/index.js');
// 引入自定义html模板
var templateIndex   = require('./index.string');

// 页面的逻辑部分
var page = {
    // 全局数据对象
    data : {
        listParam : {
            keyword     : _util.getUrlParam('keyword')      || '',
            categoryId  : _util.getUrlParam('categoryId')   || '',
            orderBy     : _util.getUrlParam('orderBy')      || 'default',
            pageNum     : _util.getUrlParam('pageNum')      || 1,
            pageSize    : _util.getUrlParam('pageSize')     || 20
        }
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
        this.loadList();
    },

    /**
     * 绑定事件
     */
    bindEvent : function(){
        var _this = this;
        // 添加点击事件
        $('.sort-item').click(function(){
            // 保存当前对象
            var $this = $(this);
            // 当前页面重置为第一页
            _this.data.listParam.pageNum = 1;
            // 判断当前点击的对象的data-type属性
            if ($this.data('type') === 'default'){
                // 当前点击的为“默认排序” 
                if ($this.hasClass('active')){
                    // 当前包含按钮已经被选中
                    return;
                } else {
                    // 当前按钮是未选中状态，需要设置为选中状态
                    $this.addClass('active')
                    // 去除同级节点的选中状态
                    .siblings('.sort-item').removeClass('active asc desc');
                    // 全局变量的orderBy设置为defualt
                    _this.data.listParam.orderBy = 'defult';
                }
            } else {
                // 当前点击的是价格排序
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if (!$this.hasClass('asc')){
                    // 点击升序
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    // 点击降序
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 再次加载列表
            _this.loadList();
        });
    },

    /**
     * 加载list模板
     */
    loadList : function(){
        var _this     = this,
            listParam = this.data.listParam,
            listHtml  = '';

        // 调用service层
        _product.getProducts(listParam, function(res){
            listHtml = _util.renderHtml(templateIndex, {
                list : res.list
            });
            // 将渲染成功的html放入容器
            $('.p-list-con').html(listHtml);
            // 渲染分页信息
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            // 错误提示
            _util.errorTips(errMsg);
        });
    }, 

    /**
     * 加载分页信息
     */
    loadPagination : function(pageInfo){
        var _this = this;
        // 创建一个类实例 
        this.pagination ? '' : (this.pagination = new Pagination());
        // 调用对象的渲染方法
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
    
}

// 执行init方法
$(function(){
    page.init();
});

