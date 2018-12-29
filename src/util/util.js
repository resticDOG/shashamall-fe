/**
 * 通用工具类：封装http请求等方法
 */


//引入hogan
var Hogan = require('hogan.js');
//定义一个配置对象
var conf = {
    serverHost : ""
};
//输出的工具类对象
var shashsamallUtil = {
    http: function(paramInfo){
        //保存this指代
        var _this = this;

        //外部传递一个参数对象,使用jQuery的ajax请求
        $.ajax({
            type: paramInfo.method ||'get',     //请求的方法，默认get
            url: paramInfo.url || '',           //请求url
            dataType: paramInfo.type || 'json', //请求格式
            data : paramInfo.data || '',        //请求数据，默认空
            /**
             * 请求成功的回调函数
             */
            success: function(res){
                //封装请求成功处理的逻辑
                if (0 === res.status){
                    //和后端的约定，status 0代表请求是成功的，判断传入的对象中回调函数是否是函数对象
                    typeof paramInfo.success === 'function' && paramInfo.success(res.data, res.msg);    //若是函数则调用
                } 
                else if (10 === res.status){
                    // status 10代表无登录状态，需要强制登录
                    _this.doLogin();
                }
                else if (1 === res.status){
                    // status 1代表请求的数据错误
                    typeof paramInfo.error === 'function' && paramInfo.error(res.msg);
                }
            },
            //请求失败的回调函数
            error: function(err){
                //网络请求错误，错误信息存在err.statusText中
                typeof paramInfo.error === 'function' && paramInfo.error(err.statusText);
            }
        });

    },

    //获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },

    /**
     * 根据传入的key值，取出对应的value，该键值对就是url中的参数
     * @param  {string} key [需要查找的参数名]
     * @return {string}     [该参数名对应的值]
     */
    getUrlParam : function(key){
        var reg     = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
        var result  = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    /**
     * 根据传入的html模板和数据渲染生成所需的html，类似微信小程序的模板
     * 实现使用了hogen组件，该组件的使用方法是需要先编译，后渲染，此处封装就是为了省略步骤
     * @param  {[type]} htmlTemplate [传入的html模板]
     * @param  {[type]} data         [一个对象，里面包含模板里的数据]
     * @return {[type]}              [返回渲染好的html]
     */
    renderHtml : function(htmlTemplate, data){
        //渲染模板
        var template = Hogan.compile(htmlTemplate);
        //处理数据病返回
        return template.render(data);
    },

    // 通用提示功能封装：操作成功提示
    successTips : function(msg){
        alert(msg || '操作成功');
    },

    // 操作失败提示
    successTips : function(msg){
        alert(msg || '操作失败');
    },
    // 字段的验证，支持是否非空、是否是手机号、是否是邮箱地址的判断
    validate : function(value, type){
        //需要把前后的空格去掉
        var value = $.trim(value);
        // 非空判断
        if ('require' === type){
            // 这里可以将value转换成boolean型
            return !!value;
        }
        // 手机号验证，正则表示以1开始11位数字
        if ('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 校验邮箱地址
        if ('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }

    },

    //跳转到登录页面
    doLogin: function(){
        //为了能让登录之后返回登录前页面，需要加上当前页面的路径参数，并且该参数需要编码
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    // 跳转到首页
    goHome : function(){
        window.location.href = './index.html';
    }
}

//把模块输出供外部使用
module.exports = shashsamallUtil;