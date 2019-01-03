/*
* @Author: linkzz
* @Date:   2018-12-29 23:02:18
* @Last Modified by:   linkzz
* @Last Modified time: 2018-12-30 16:32:59
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
    }

    

}

//输出
module.exports = _user;