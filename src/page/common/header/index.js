/*
* @Author: linkzz
* @Date:   2019-01-02 10:35:51
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-08 11:58:26
*/
require('./index.css');

// 工具类
var _util = require('util/util.js');

var header = {
    //初始化
    init : function(){
        //关键词回填
        this.onLoad();
        // 绑定事件
        this.bindEvent();
        
    },
    /**
     * 加载输入框的回填
     */
    onLoad : function(){
        // 获取参数值
        var keyword = _util.getUrlParam('keyword');
        // 若有值则回填
        if (keyword){
            $('#search-input').val(keyword);
        };
    },

    /**
     * 事件绑定方法
     */
    bindEvent : function(){
        // 绑定搜索按钮
        var _this = this;
        $('#search-button').click(function(){
            // 提交操作
            _this.searchSubmit();
        });
        // 响应回车按钮提交
        $('#search-input').keyup(function(event){
            // 按钮按下之后有回调函数
            if (event.keyCode === 13){
                // keyCode 13表示回车按钮
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        if (keyword){
            // 如果有关键字则跳转list页
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            //keyword为空，直接返回首页
            _util.goHome();
        }
    }
};

//不需要向外部输出
header.init();