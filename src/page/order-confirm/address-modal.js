/*
* @Author: linkzz
* @Date:   2019-01-22 15:14:34
* @Last Modified by:   linkzz
* @Last Modified time: 2019-01-23 21:49:16
*/
// 工具类
var _util                   = require('util/util.js');
// 城市工具类
var _cities                 = require('util/city/index.js');
var _address                = require('service/address-service.js');
// 引入自定义html模板
var templateAddressModal    = require('./address-modal.string');

// 页面的逻辑部分
var addressModal = {
    /**
     * 显示方法
     */
    show : function (option) {
        // 绑定外部传入的option
        this.option         = option;
        // 防止data为undefind
        this.option.data    = option.data || {};
        // 缓存容器DOM
        this.$modalWrap     = $('.modal-wrap');
        // 渲染页面
        this.loadModal();
        // 绑定事件
        this.bindEvent();
    },

    /**
     * 渲染页面
     */
    loadModal : function(){
        // 渲染html
        var addressModalHtml = _util.renderHtml(templateAddressModal, {
            isUpdate : this.option.isUpdate,
            data     : this.option.data
        });
        // 放入容器
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();
        
    },

    /**
     * 加载省份信息
     */
    loadProvince : function(){
        var provinces       = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 若是更新地址，并且返回字段中有省份信息,将省份信息放在前面是防止data为空时报错
        if (this.option.data.receiverProvince && this.option.isUpdate){
            $provinceSelect.val(this.option.data.receiverProvince);
            // 加载城市
            this.loadCities(this.option.data.receiverProvince);
        }
    },

    /**
     * 获取下拉选择框选项
     */
    getSelectOption : function(optionArray){
        var html = '<option value="">==请选择==</option>';
        // 这里先用length缓存数组长度length可以只执行一次length，而不必每次加载都要执行，略提升性能
        for (var i = 0, length = optionArray.length; i < length; i++){
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    /**
     * 根据省份加载该省份的城市信息
     */
    loadCities : function(provinceName){
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        // 若是更新地址，并且返回字段中有城市信息  
        if (this.option.data.receiverCity && this.option.isUpdate){
            $citySelect.val(this.option.data.receiverCity);
        }
    },

    /**
     * 绑定事件
     */
    bindEvent : function(){
        var _this = this;
        // 省份和城市二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });

        // 提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate     = _this.option.isUpdate;
            // 验证表单字段，除了zip之外都是必填的
            var validResult = _this.checkValid(receiverInfo);
            if (!isUpdate && validResult.status){
                // 新增用户地址，需要把zip字段添加上
                receiverInfo.receiverZip = _this.getValueById('#receiver-zip');
                _address.addAddress(receiverInfo, function(res){
                    // 弹出成功提示
                    _util.successTips('地址添加成功！');
                    // 隐藏地址模块
                    _this.hide();
                    // 执行回调
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                }, function(errMsg){
                    _util.errorTips(errMsg);
                });
            } else if (isUpdate && validResult.status) {
                // 修改用户地址,需要把zip字段添加上
                receiverInfo.receiverZip = _this.getValueById('#receiver-zip');
                // 获取需要更新的地址id，由于是服务器中获取的，所以字段无需验证
                receiverInfo.id = _this.getValueById('#receiver-id');
                _address.updateAddress(receiverInfo, function(res){
                    // 弹出成功提示
                    _util.successTips('地址修改成功！');
                    // 隐藏地址模块
                    _this.hide();
                    // 执行回调
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                }, function(errMsg){
                    _util.errorTips(errMsg);
                });
                
            } else {
                // 字段验证失败
                _util.errorTips(validResult.msg || '发生了未知错误');
            }
        });
        // 点击close图标和蒙版关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });
        // 阻止蒙版事件冒泡
        this.$modalWrap.find('.modal-container').click(function(event){
            // 事件阻止冒泡
            event.stopPropagation();
        });
        // 地址编辑
        this.$modalWrap.find('.modal-container').click(function(event){
            // 事件阻止冒泡
            event.stopPropagation();
        });
    },

    /**
     * 获取表单字段，由于字段验证的时候不需要邮箱字段，所以该字段不包含在返回值中
     */
    getReceiverInfo : function(){
        var receiverInfo = {
            receiverName        : this.getValueById('#receiver-name'),
            receiverProvince    : this.getValueById('#receiver-province'),
            receiverCity        : this.getValueById('#receiver-city'),
            receiverPhone       : this.getValueById('#receiver-phone'),
            receiverAddress     : this.getValueById('#receiver-address'),
        };
        return receiverInfo;
    },

    /**
     * 根据id获取id对应的字段
     */
    getValueById : function(id){
        return $.trim(this.$modalWrap.find(id).val());
    },

    /**
     * 验证给定对象的字段是否有效
     * @param  {Object} receiverInfo 需要验证的收货信息
     * @return {Object} 包含两个字段：status和msg只有验证通过status为true，验证失败返回msg
     */
    checkValid : function(receiverInfo){
        var result = {
            status : true
        }
        for (var receiverItem in receiverInfo){
            if (!_util.validate(receiverInfo[receiverItem], 'require')){
                result.status   = false;
                result.msg      = '请输入完整的收货信息';
                return result;
            }
        }
        return result;
    },
    /**
     * 隐藏方法
     */
    hide : function(){
        this.$modalWrap.empty();
    }

}

// 模块输出
module.exports = addressModal;

