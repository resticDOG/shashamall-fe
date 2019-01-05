/*
* @Author: linkzz
* @Date:   2018-12-24 17:02:29
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-05 18:35:33
*/
// 自身css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');

// header模板
require('page/common/header/index.js');

// 工具类
var _util           = require('util/util.js');
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
        this.bindEvent();
    },

    onLoad : function(){
        // 加载左侧导航条
        navSide.init({
            name : 'user-center'
        });
        // 初始化用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        // 这里因为用户信息部分是用js渲染出来的html模板，所以普通的bindEvent是无效的,需要在全局添加事件，通过冒泡事件添加绑定
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validataResult = _this.formValidata(userInfo);
            if (validataResult.status){
                // 字段是有效的,开始请求接口
                _user.updateUserInfo(userInfo, function(res, msg){
                    // 成功则提示成功信息
                    _util.successTips(msg);
                    // 跳转个人信息查看页
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _util.errorTips(errMsg);
                });
            } else {
                // 字段是无效的,无效提示保存在validataResult中
                _util.errorTips(validataResult.msg);
            }

        });
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
    },
    /**
     * 判断传入的参数是否合法
     * @param  {[object]} formData [需要验证的参数对象集合]
     * @return {[object]}          [返回一个包含boolean : status和string : msg的对象]
     */
    formValidata : function(formData){
        // 初始化需要返回的对象
        var result = {
            status  : false,
            msg     : ''
        };
        if (!_util.validate(formData.phone, 'phone')){
            // 验证不通过,加上msg信息返回
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_util.validate(formData.email, 'email')){
            // 验证不通过,加上msg信息返回
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_util.validate(formData.question, 'require')){
            // 验证不通过,加上msg信息返回
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_util.validate(formData.answer, 'require')){
            // 验证不通过,加上msg信息返回
            result.msg = '密码提示答案不能为空';
            return result;
        }
        // 验证通过
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
}

// 执行init方法
$(function(){
    page.init();
});

