/*
* @Author: linkzz
* @Date:   2018-12-24 17:29:45
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-13 15:34:39
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

//环境变量配置， 开发环境和线上环境 dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html的配置参数
var getHtmlConfig = function(name, title){
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title   : title,
        inject  : true,
        hash    : true,
        chunks  : ['common', name]
    };
};

//webpack config
var config = {
    entry: {
        'common'                : ['./src/page/common/index.js'],
        'index'                 : ['./src/page/index/index.js'],
        'list'                  : ['./src/page/list/index.js'],
        'detail'                : ['./src/page/detail/index.js'],
        'user-login'            : ['./src/page/user-login/index.js'],
        'user-register'         : ['./src/page/user-register/index.js'],
        'user-center'           : ['./src/page/user-center/index.js'],
        'user-center-update'    : ['./src/page/user-center-update/index.js'],
        'user-pass-reset'       : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js'],
        'result'                : ['./src/page/result/index.js']
    },
    output: {
        path        : './dist',
        publicPath  : '/dist',
        filename    : 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    //配置别名
    resolve: {
        alias: {
            //别名 _dirname代表根目录
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    module: {
        loaders: [
            {
                test    : /\.css$/, 
                loader  : ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            //按照这种格式写loader才会生效
            {
                test    : /\.(gif|png|jpg|woff|svg|ttf|eot)\??.*$/, 
                loader  : 'url-loader?limit=1000000&name=resource/[name].[ext]'
            },
            {
                test    : /\.string$/,
                loader  : 'html-loader'
            }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name    : 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '重置密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情'))
    ]
};

//判断打包环境是否是dev
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');   //追加线上环境打包
}

module.exports = config;