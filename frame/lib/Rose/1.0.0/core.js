/**
 * Rose (Web开发工具集)
 * 当前库依赖第三方库：
 * 1).jQuery（v1.7.x）。详细了解：http://jquery.com/
 * 2).json2.js库。如果浏览器支持JSON.stringify和JSON.parse接口就不需要此库，详细了解：http://www.json.org/
 * 当前库实现的基本功能：
 * 0).Rose: 基础库；
 * 1).Rose.ajax: 异步数据请求封装；
 * 2).Rose.date: 日期时间操作；
 * 3).Rose.cookie: 日期时间操作；
 * 4).Rose.layer: 页面遮罩层；
 * 5).Rose.msg: 提示信息；
 * 6).Rose.browser: 页面导航工具；
 * 7).Rose.vilidate: 常用正则表达式；
 * 8).Rose.string: 字符串操作;
 * @module Rose
 * @author qijc
 * @class Rose为顶层入口对象
 */
Rose = {
    /**
     * Rose库版本
     * @type {String}
     * @property version
     */
    version: '1.0.0',
    /**
     * 显示当前对象名称路径
     *
     * @method toString
     * @return {String} 'Rose'
     */
    toString: function () {
        return 'Rose';
    },
    /**
     * 唯一标识
     * @type {Number}
     * @property guid
     */
    guid:1,
    /**
     * 返回一个唯一标识字符串
     *
     * @method getGuid
     * @return {String} 唯一标识字符串
     */
    getGuid:function(){
        return 'Rose_' + this.guid++; 
    },
    /**
     * 生成唯一CID编号:时间+4位随机数
     * @method random
     * @returns {String} 随机数
     */
    random: function () {
        return new Date().getTime() + '' + Math.round(Math.random() * 10000);
    },
    /**
     * html转义
     *
     * @method htmlFilter
     * @param {String} content
     * @param {Mixed} type 引号转义方式
     * 过滤掉全部html标签(默认)
     * 1: 转义单引号&html标签
     * 2: 转义双引号&html标签
     * 3: 转义单双引号&html标签 
    */
    htmlFilter: function(content,type){
        if (typeof type == 'undefined'){
            content = content.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            content.value = content.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            //content = content.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        }
        if(type == 1 || type == 3){
            //单引号
            content = content.replace(/'/g, '&#039;');
        }
        if(type == 2 || type == 3){
            //多引号
            content = content.replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/>/g, '&gt;');
            content = content.replace(/"/g, '&quot');
        }
        return content;
    },
    /**
     * 转义引号
     *
     * @method htmlFilter
     * @param {String} content
     * @param {Mixed} quota_style 引号转义方式
     * 1: SINGLE <a href='qq'>q</a> --> <a href=\'qq\'>q</a>
     * 2: DOUBLE(默认) <a href="qq">q</a> --> <a href=\"qq\">q</a>
     */
    quote:function(content, quote_style){
        if(typeof quote_style == 'undefined'){
        quote_style = 2;
        }
        //单引号
        if(quote_style == 1){
            content = content.replace(/'/g, '\\\'');
        }
        else if(quote_style == 2){
            content = content.replace(/"/g, '\\"');
        }
        return content;    
    }
    ,
    /**
     * 判断是否含有'.'号
     *
     * @method hasDot
     * @param {String} str 输入字符串
     * @returns {Boolean}
     */
    hasDot: function (str) {
        if (typeof str != 'string') {
            return false;
        }
        if (str.indexOf('.') != -1) {
            return true;
        }
        return false;
    },
    /**
     * 判断对象是否为纯整形数字或整形数字字符串 011=9(011 表示8进制)
     *
     * @method isInteger
     * @param {Number/String} obj 输入数字或字符串
     * @return {Boolean}
     */
    isInteger: function (obj) {
        if (obj != parseInt(obj, 10)) {
            return false;
        }
        return true;
    },
    /**
     * 将"undefined"和null转换为空串
     *
     * @method obj2Empty
     * @param {Object} obj 输入对象
     * @return {Object}
     */
    obj2Empty: function (obj) {
        if (typeof obj == "undefined" || obj == null) {
            return '';
        }
        return obj;
    },
    /**
     * 颜色取反，如将白色'#ffffff'转换为黑色'#000000'
     *
     * @method colorInverse
     * @param {String} color 颜色16进制字符表示形式，如：'#ff0000'，表示红色。
     * @return {String} 取反后的颜色
     */
    colorInverse: function (color) {
        if (color.length < 7) {
            return '#000000';
        }
        var str = color, inverse = "#";
        for (var i = 1; i < 7; i++) {
            var s = str.substr(i, 1);
            inverse += parseInt(15 - parseInt(s, 16)).toString(16);
        }
        return inverse;
    },
    /**
     * 获取浏览器语言代码,如:'zh-CN'
     *
     * @method getLang
     * @return {String} 语言代码
     */
    getLang: function () {
        var nav = window.navigator;
        return (nav.language || nav.userLanguage);
    },
    /**
     * 取消事件冒泡
     *
     * @method stopBubble
     * @param {Object} e 事件对象
     */
    stopBubble: function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            // ie
            window.event.cancelBubble = true;
        }
    },
    /**
     * 阻止浏览器默认行为
     *
     * @method stopDefault
     * @param {Object} e 事件对象
     * @return {Boolean}
     */
    preventDefault: function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            // ie
            window.event.returnValue = false;
        }
        return false;
    },
    /**
     * console.log方法(兼容IE)
     *
     * @method log
     * @param {All} text
     */
    log:function(text){
        window.console && console.log(text);
    }
};