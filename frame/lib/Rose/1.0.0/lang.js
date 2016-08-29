/**
 * 判断数据类型 
 *
 * @namespace Rose
 * @class string
 */
Rose.lang = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose.lang'
	 */
	toString : function() {
		return 'Rose.lang';
	},  
    /**
	 * 是否为数组
	 *
	 * @method isArray
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isArray : function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Array]';
	},
	/**
	 * 是否为空
	 *
	 * @method isEmpty
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isEmpty : function(obj) {
		 return obj === null || typeof obj === 'undefined' || 
			 obj === 0 || obj === false || obj === '' || 
			(typeof obj.length === 'number' && obj.length === 0);
	},
	/**
	 * 是否为数值
	 *
	 * @method isNumber
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isNumber : function(obj) {
		 return typeof(obj) === 'number';
	},
	/**
	 * 是否为字符
	 *
	 * @method isString
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isString : function(obj) {
		return typeof(obj) === 'string';
	},
	/**
	 * 是否为布尔值
	 *
	 * @method isBoolean
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isBoolean : function(obj) {
		return typeof(obj) === 'boolean';
	},
	/**
	 * 是否为对象
	 *
	 * @method isObject
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isObject : function(obj) {
		return typeof(obj) === 'object';
	},
	/**
	 * 是否为函数
	 *
	 * @method isFunction
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isFunction : function(obj) {
		return typeof(obj) === 'function';
	},
	/**
	 * 是否为 undefined
	 *
	 * @method isUndefined
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isUndefined : function(obj) {
		 return o === undefined;
	},
	/**
	 * 是否为 null
	 *
	 * @method isNull
	 * @param {All} obj 主体
	 * @return {Boolean} true/false
	 */
	isNull : function(obj) {
		 return o === null;
	}
}

