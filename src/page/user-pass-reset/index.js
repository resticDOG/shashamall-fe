/*
* @Author: linkzz
* @Date:   2018-12-24 17:56:09
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-04 22:34:52
*/
// css文件
require('./index.css');
// 引入nav-simple模板
require('page/common/nav-simple/index.js');
// 工具类
var _util = require('util/util.js');
// user-service
var _user = require('service/user-service.js');

/**
 * 封装了表单的错误显示方法
 * @type {Object}
 */
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
}

// 逻辑部分
var page = {
    // 用来保存用户的token等信息
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
    },
    /**
     * 初始化方法
     * 分别绑定submit按钮响应事件
     * 然后验证表单字段正确性之后提交
     */
    init : function(){
        this.onLoad();
        this.bindEvent();
    },

    /**
     * 加载函数
     */
    onLoad : function(){
        // 加载第一步
        this.loadStepUsername();
    },
    /**
     * 事件绑定方法
     */
    bindEvent : function(){
        var _this = this;
        // 输入用户名的下一步按钮点击时的响应事件
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if (username){
                // username不为空则请求接口
                _user.getQuestion(username, function(res){
                    // 成功则把数据保存在page的变量中
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    // 失败则显示失败信息
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入用户名');
            }
        });

        // 输入答案的下一步按钮点击时的响应事件
        $('#submit-question').click(function(){
            var answer = $.trim($('#question').val());
            if (answer){
                // username不为空则请求接口
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function(res){
                    // 成功则把数据保存在page的变量中
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    // 失败则显示失败信息
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入问题提示答案');
            }
        });

        // 新密码提交按钮点击时的响应事件
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            if (password && password.length >= 6){
                // password不为空请求接口
                _user.resetPassword({
                    username        : _this.data.username,
                    forgetToken     : _this.data.token,
                    passwordNew     : password
                }, function(res){
                    // 成功则调到结果页
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    // 失败则显示失败信息
                    formError.show(errMsg);
                });
            } else {
                // 密码为空或不满6位
                formError.show('请输入不小于6位数的密码');
            }
        });
        
    },
    /**
     * 加载第一步,通过username获取用户的提示问题
     */
    loadStepUsername : function(){
        $('.step-username').show();
    },


    /**
     * 加载第二步，验证提示问题答案的正确性
     */
    loadStepQuestion : function(){
        // 首先应隐藏错误信息
        formError.hide();
        // 容器的切换
        $('.step-username').hide().siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },

    /**
     * 加载第三步，通过一个token和问题的答案来修改用户密码
     */
    loadStepPassword : function(){
        // 首先应隐藏错误信息
        formError.hide();
        // 容器的切换
        $('.step-question').hide().siblings('.step-password').show();
    }
}

$(function(){
    // 在jQuery的ready函数结束后调用init方法
    page.init();
});
