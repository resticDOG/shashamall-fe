/*
* @Author: linkzz
* @Date:   2018-12-24 17:29:45
* @Last Modified by:   linkzz
* @Last Modified time: 2019-02-03 16:07:44
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
        favicon : './favicon.ico',
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
        'about'                 : ['./src/page/about/index.js'],
        'list'                  : ['./src/page/list/index.js'],
        'cart'                  : ['./src/page/cart/index.js'],
        'detail'                : ['./src/page/detail/index.js'],
        'user-login'            : ['./src/page/user-login/index.js'],
        'order-confirm'         : ['./src/page/order-confirm/index.js'],
        'order-list'            : ['./src/page/order-list/index.js'],
        'order-detail'          : ['./src/page/order-detail/index.js'],
        'payment'               : ['./src/page/payment/index.js'],
        'user-register'         : ['./src/page/user-register/index.js'],
        'user-center'           : ['./src/page/user-center/index.js'],
        'user-center-update'    : ['./src/page/user-center-update/index.js'],
        'user-pass-reset'       : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js'],
        'result'                : ['./src/page/result/index.js']
    },
    output: {
        // webpack2版本后不再支持相对路径
        path        : __dirname + '/dist/',
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.shashamall.com/dist/',
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
                loader  : 'url-loader?limit=1000&name=resource/[name].[ext]'
            },
            {
                test    : /\.string$/,
                loader  : 'html-loader',
                query   : {
                    // 处理String时最小化压缩
                    minimize              : true,
                    // 压缩是不移除引号
                    removeAttributeQuotes : false

                }
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
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '我的订单')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '重置密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情'))
    ]
};

//判断打包环境是否是dev
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');   //追加线上环境打包
}

module.exports = config;