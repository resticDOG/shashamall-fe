/*
* @Author: linkzz
* @Date:   2018-12-24 17:02:29
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-05 21:44:41
*/
// 自身css
require('./index.css');
// 引入nav-simple模板
require('page/common/nav/index.js');

// header模板
require('page/common/header/index.js');

// 工具类
var _util            = require('util/util.js');
// nav-side模板
var navSide         = require('page/common/nav-side/index.js');
// user-service
var _user           = require('service/user-service.js');

// 页面的逻辑部分
var page = {
    /**
     * 初始化方法
     */
    init : function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function(){
        // 加载左侧导航条
        navSide.init({
            name : 'pass-update'
        });
    },
    /**
     * 绑定提交按钮
     */
    bindEvent : function(){
        var _this = this;
        // 这里因为用户信息部分是用js渲染出来的html模板，所以普通的bindEvent是无效的,需要在全局添加事件，通过冒泡事件添加绑定
        $('.btn-submit').click(function(){
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
            validataResult = _this.formValidata(userInfo);
            if (validataResult.status){
                // 字段是有效的,开始请求接口
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    // 修改成功后需先登出
                    _user.logout();
                    // 跳转操作结果页
                    window.location.href = './result.html?type=pass-update';
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
        if (!_util.validate(formData.password, 'require')){
            // 验证不通过,加上msg信息返回
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码的长度
        if (!formData.passwordNew || formData.passwordNew.length < 6)
        if (!_util.validate(formData.phone, 'phone')){
            // 验证不通过,加上msg信息返回
            result.msg = '新密码长度不能小于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
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