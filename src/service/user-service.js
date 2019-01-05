/*
* @Author: linkzz
* @Date:   2018-12-29 23:02:18
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-05 20:53:01
*/
//和用户模块接口对接的service
//工具类
var util = require('util/util.js');

//输出的user模块
var _user = {

    /**
     * 模块提供的登出方法
     * @param  {function} resolve [请求成功的处理函数，该函数包含一个res参数及请求成功返回的数据data和提示信息msg]
     * @param  {function} reject  [请求失败的处理函数，该函数包含失败信息msg]
     */
    logout : function(resolve, reject){
        // 实质就是发起一个ajax请求
        util.http({
            url     : util.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 获取登录状态，通过判断后端返回的status如果工具类成功调用success函数证明是登录状态，否则未登录
     */
    checkLogin : function(resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 用户登录
     * @param  {[object]} userInfo [用户名和密码等信息]
     * @param  {[function]} resolve  [成功回调]
     * @param  {[function]} reject   [失败回调]
     */
    login : function(userInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 检查用户名是否存在
     *
     */
    checkUsername : function(username, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/check_valid.do'),
            data    : {
                type : 'username',
                str  : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 注册接口
     */
    register : function(userInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    /**
     * 根据username获取question
     */
    getQuestion : function(username, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 检查答案是否正确
     */
    checkAnswer : function(userInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 重置密码
     */
     resetPassword : function(userInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    /**
     * 更改用户信息
     */
    updateUserInfo : function(userInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    /**
     * 登录状态下更新密码
     */
    updatePassword : function(userInfo, resolve, reject){
        util.http({
            url     : util.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

}

//输出
module.exports = _user;