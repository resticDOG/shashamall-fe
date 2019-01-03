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

- #### 技巧
- #### 踩坑记录
    1. html模板渲染工具**hogan**的引用报错<br/>
    执行 `npm install hogan --save` 将hogen作为项目生产环境依赖安装之后 `require('hogan')` 之后打包报错: `Cannot resolve module 'hogan'` ，查阅资料之后发现是引用位置变更了，新版本的hogen模块是在node_modules下的hogan.js中，故重新引入 `require('hogan.js')` 之后打包成功。<br><br>
    2. `<mata http-equiv="x-ua-compatible" content="ie=edge" />`让网页元素检查时`meta`标签跑到`body`标签当中<br/>
    使用了`<mata http-equiv="x-ua-compatible" content="ie=edge" />`标签之后发现网页元素检查时`meta`标签错位了，本该包含在`head`标签内的`meta`标签跑到了`body`标签中，目前原因尚不知晓（原谅我是个前端菜鸟 ^_^），删去该行内容后正常。<br>
    ![源代码显示正常](screenshot/before1.png "源代码显示正常")<br>
    源代码显示正常<br>
    ![meta标签表现错位](screenshot/before2.png "meta标签表现错位")<br>
    meta标签表现错位<br>
    ![修改后显示正常](screenshot/after.png "修改后显示正常")<br>
    修改后显示正常<br><br>
    3. nginx代理导致session丢失？<br>
        在测试后端接口的过程中发现系统不能记录我的登录状态，每次登录之后再调用查询用户信息的接口返回的结果都是用户未登录。后端的登录接口如下：<br>
```java
    @RequestMapping(value = "login.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> login(String username, String password, HttpSession session){
        ServerResponse<User> response = iUserService.login(username, password);
        if (response.isSuccess()){
            //登录成功，将user存入session中
            session.setAttribute(Const.CURRENT_USER, response.getData());
        }
        return response;
    }
```
获取用户信息接口如下：<br>
```java
    @RequestMapping(value = "get_user_info.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> getUserInfo(HttpSession session){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (null == user){
            return ServerResponse.createByErrorMessage("用户未登陆，无法获取当前用户信息");
        }
        return ServerResponse.createBySuccess("获取成功", user);
    }
```
可见用户的信息是存在session中的，而使用restlet测试接口的时候发现了蹊跷：
![每次都会被设置新的session](screenshot/session.png)
在访问接口的时候每次服务器都会设置新的`session`,在JavaWeb中我们知道：
>在浏览器第一次访问`servlet`时，`servlet`会生成一个`sessionId`，这个`sessionId`会被保存到客户端的会话`cookie`中，当浏览器再次访问的时候会携带`cookie`，而`cookie`中就保存着这个`sessionId`，这是服务器会根据`sessionId`取出对应的会话`session`,tomcat服务器生成的`sessionId`叫`JSESSIONID`。<br>

那么访问接口出现session消失的原因肯定就出在nginx代理配置中，果然查阅资料发现：
>`location`后的路径和代理的路径不一致就会产生session丢失的问题，需要在配置中加上`proxy_cookie_path`配置方可保持`session`。
nginx作如下配置：<br>

```nginx
    server {
            listen 80;
            autoindex on;
            server_name www.shashamall.com;
            access_log /usr/local/nginx/logs/access.log combined;
            index index.html index.htm index.jsp index.php;
            #error_page 404 /404.html;
            if ( $query_string ~* ".*[\;'\<\>].*" ){
                    return 404;
            }
            location / {
                    proxy_pass http://127.0.0.1:8088/mmall/;
                    proxy_cookie_path /mmall /;            //问题所在
                    add_header Access-Control-Allow-Origin *;
            }
    }
```




