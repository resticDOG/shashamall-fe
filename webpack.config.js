/*
* @Author: linkzz
* @Date:   2018-12-24 17:29:45
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-03 10:14:07
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

//环境变量配置， 开发环境和线上环境 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

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
        'common':['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
        'result' : ['./src/page/result/index.js']
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
        new HtmlWebpackPlugin(getHtmlConfig('login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ]
};

//判断打包环境是否是dev
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');   //追加线上环境打包
}

module.exports = config;