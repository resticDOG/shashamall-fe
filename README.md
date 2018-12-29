### shashamall-fe项目介绍
- #### 项目介绍
  该项目是本人练手的项目，慕课网从零打造商城的前端项目项目的一些学习心得会在这里更新，想了下就当做学习笔记吧，同时在学习过程中遇到坑也会在此文档更新，你也可以在[我的博客](https://www.cnblogs.com/linkzz/ "linkzz的博客")浏览学习笔记。
- #### 传送门
    - *心得*
    - *技巧*
    - *踩坑记录*
- ####心得
    1. **取非符号的妙用**</br>
    如下代码块：
```javascript
    // 字段的验证，支持是否非空、是否是手机号、是否是邮箱地址的判断
    validate : function(value, type){
        //需要把前后的空格去掉
        var value = $.trim(value);
        // 非空判断
        if ('require' === type){
            // 这里可以将value转换成boolean型
            return !!value;
        }
    }
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经过测试在js中`!null`、`!undefined`、`!''`输出结果都为`true`，而任意非空字符串取非均为`false`。代码中巧妙的利用了这点，先用jquery把传入的参数去掉空格，同时转换成字符串，再进行二次取非操作，这样传入的空字符就会返回boolean型的`true`,这样函数的返回值也更容易理解，当传入的是空串时返回`true`。

- ####技巧
- ####踩坑记录
    1. html模板渲染工具**hogan**的引用报错<br/>
    执行 `npm install hogan --save` 将hogen作为项目生产环境依赖安装之后 `require('hogan')` 之后打包报错: `Cannot resolve module 'hogan'` ，查阅资料之后发现是引用位置变更了，新版本的hogen模块是在node_modules下的hogan.js中，故重新引入 `require('hogan.js')` 之后打包成功。
    2. `<mata http-equiv="x-ua-compatible" content="ie=edge" />`让网页元素检查时`meta`标签跑到`body`标签当中<br/>
    使用了`<mata http-equiv="x-ua-compatible" content="ie=edge" />`标签之后发现网页元素检查时`meta`标签错位了，本该包含在`head`标签内的`meta`标签跑到了`body`标签中，目前原因尚不知晓（原谅我是个前端菜鸟 ^_^），删去该行内容后正常。<br>
    ![源代码显示正常](screenshot/before1.png "源代码显示正常")
    ![meta标签表现错位](screenshot/before2.png "meta标签表现错位")
    ![修改后显示正常](screenshot/after.png "修改后显示正常")




