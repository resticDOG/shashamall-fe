/*
* @Author: linkzz
* @Date:   2018-12-24 17:56:09
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-04 10:28:41
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
    /**
     * 初始化方法
     * 分别绑定submit按钮响应事件
     * 然后验证表单字段正确性之后提交
     */
    init : function(){
        this.bindEvent();
    },
    /**
     * 事件绑定方法
     */
    bindEvent : function(){
        var _this = this;
        // 登录按钮点击时的响应事件
        $('#submit').click(function(){
            _this.submit();
        });
        // 按下回车也做提交操作
        $('.user-content').keyup(function(event){
            // 事件携带的keyCode == 13表示按下了回车按钮
            if (event.keyCode === 13){
                _this.submit();
            }
        });

    },
    /**
     * 表单的提交
     */
    submit : function(){
        // 将用户名和密码封装
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        };
        // 进行表单验证
        var validataResult = this.formValidata(formData);
        if (validataResult.status){
            // 若验证成功则开始提交
            _user.login(formData, function(res){
                // 跳转相应页面
                window.location.href = _util.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            })
        } else {
            // 若验证失败，则将失败的信息显示给用户
            formError.show(validataResult.msg);
        }
        

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
        // 通过工具类的api进行验证
        if (!_util.validate(formData.username, 'require')){
            // 验证不通过,加上msg信息返回
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_util.validate(formData.password, 'require')){
            // 验证不通过,加上msg信息返回
            result.msg = '密码不能为空';
            return result;
        }
        // 验证通过
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function(){
    // 在jQuery的ready函数结束后调用init方法
    page.init();
});
