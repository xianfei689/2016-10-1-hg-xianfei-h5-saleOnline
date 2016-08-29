/**
 * Rose (Web开发工具集) 当前库依赖第三方库： 1).jQuery（v1.7.x）。详细了解：http://jquery.com/
 * 2).json2.js库。如果浏览器支持JSON.stringify和JSON.parse接口就不需要此库，详细了解：http://www.json.org/
 * 当前库实现的基本功能： 0).Rose: 基础库； 1).Rose.ajax: 异步数据请求封装； 2).Rose.date: 日期时间操作；
 * 3).Rose.cookie: 日期时间操作； 4).Rose.layer: 页面遮罩层； 5).Rose.msg: 提示信息；
 * 6).Rose.browser: 页面导航工具； 7).Rose.vilidate: 常用正则表达式； 8).Rose.string: 字符串操作;
 * 
 * @module Rose
 * @author qijc
 * @class Rose为顶层入口对象
 */
(function() {
	if (!window.Rose) {
		window.Rose = {};
	}
})();
Rose = {
	/**
	 * Rose库版本
	 * 
	 * @type {String}
	 * @property version
	 */
	version : '1.0.0',
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose'
	 */
	toString : function() {
		return 'Rose';
	},
	/**
	 * 唯一标识
	 * 
	 * @type {Number}
	 * @property guid
	 */
	guid : 1,
	/**
	 * 返回一个唯一标识字符串
	 * 
	 * @method getGuid
	 * @return {String} 唯一标识字符串
	 */
	getGuid : function() {
		return 'Rose_' + this.guid++;
	},
	/**
	 * 生成唯一CID编号:时间+4位随机数
	 * 
	 * @method random
	 * @returns {String} 随机数
	 */
	random : function() {
		return new Date().getTime() + '' + Math.round(Math.random() * 10000);
	},
	/**
	 * html转义
	 * 
	 * @method htmlFilter
	 * @param {String}
	 *            content
	 * @param {Mixed}
	 *            type 引号转义方式 过滤掉全部html标签(默认) 1: 转义单引号&html标签 2: 转义双引号&html标签 3:
	 *            转义单双引号&html标签
	 */
	htmlFilter : function(content, type) {
		if (typeof type == 'undefined') {
			content = content.replace(/<\/?[^>]*>/g, ''); // 去除HTML tag
			content.value = content.replace(/[ | ]*\n/g, '\n'); // 去除行尾空白
			// content = content.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
		}
		if (type == 1 || type == 3) {
			// 单引号
			content = content.replace(/'/g, '&#039;');
		}
		if (type == 2 || type == 3) {
			// 多引号
			content = content.replace(/&/g, "&amp;").replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
			content = content.replace(/"/g, '&quot');
		}
		return content;
	},
	/**
	 * 转义引号
	 * 
	 * @method htmlFilter
	 * @param {String}
	 *            content
	 * @param {Mixed}
	 *            quota_style 引号转义方式 1: SINGLE <a href='qq'>q</a> --> <a
	 *            href=\'qq\'>q</a> 2: DOUBLE(默认) <a href="qq">q</a> --> <a
	 *            href=\"qq\">q</a>
	 */
	quote : function(content, quote_style) {
		if (typeof quote_style == 'undefined') {
			quote_style = 2;
		}
		// 单引号
		if (quote_style == 1) {
			content = content.replace(/'/g, '\\\'');
		} else if (quote_style == 2) {
			content = content.replace(/"/g, '\\"');
		}
		return content;
	},
	/**
	 * 判断是否含有'.'号
	 * 
	 * @method hasDot
	 * @param {String}
	 *            str 输入字符串
	 * @returns {Boolean}
	 */
	hasDot : function(str) {
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
	 * @param {Number/String}
	 *            obj 输入数字或字符串
	 * @return {Boolean}
	 */
	isInteger : function(obj) {
		if (obj != parseInt(obj, 10)) {
			return false;
		}
		return true;
	},
	/**
	 * 将"undefined"和null转换为空串
	 * 
	 * @method obj2Empty
	 * @param {Object}
	 *            obj 输入对象
	 * @return {Object}
	 */
	obj2Empty : function(obj) {
		if (typeof obj == "undefined" || obj == null) {
			return '';
		}
		return obj;
	},
	/**
	 * 颜色取反，如将白色'#ffffff'转换为黑色'#000000'
	 * 
	 * @method colorInverse
	 * @param {String}
	 *            color 颜色16进制字符表示形式，如：'#ff0000'，表示红色。
	 * @return {String} 取反后的颜色
	 */
	colorInverse : function(color) {
		if (color.length < 7) {
			return '#000000';
		}
		var str = color, inverse = "#";
		for ( var i = 1; i < 7; i++) {
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
	getLang : function() {
		var nav = window.navigator;
		return (nav.language || nav.userLanguage);
	},
	/**
	 * 取消事件冒泡
	 * 
	 * @method stopBubble
	 * @param {Object}
	 *            e 事件对象
	 */
	stopBubble : function(e) {
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
	 * @param {Object}
	 *            e 事件对象
	 * @return {Boolean}
	 */
	preventDefault : function(e) {
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
	 * @param {All}
	 *            text
	 */
	log : function(text) {
		window.console && console.log(text);
	}
};
/**
 * 日期时间处理工具
 * 
 * @namespace Rose
 * @class date
 */
Rose.date = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose.date'
	 */
	toString : function() {
		return 'Rose.date';
	},
	/**
	 * 将小于10数字前加0
	 * 
	 * @method _zeroCompletion
	 * @param {Number}
	 *            time 时间
	 * @return {String}
	 */
	_zeroCompletion : function(time) {
		if (time < 10) {
			return '0' + time;
		}
		return time + '';
	},
	/**
	 * 将秒转换为时间hh:mm:ss格式
	 * 
	 * @method secs2Time
	 * @param {Number}
	 *            secs 秒
	 * @return {String} 格式化时间字符串'00:00:00'
	 */
	secs2Time : function(secs) {
		if (secs < 0) {
			secs = 0;
		}
		secs = parseInt(secs, 10);
		var hours = Math.floor(secs / 3600), mins = Math
				.floor((secs % 3600) / 60), sec = secs % 3600 % 60;
		return this._zeroCompletion(hours) + ':' + this._zeroCompletion(mins)
				+ ':' + this._zeroCompletion(sec);
	},
	/**
	 * 格式化日期时间字符串
	 * 
	 * @method dateTime2str
	 * @param {Date}
	 *            dt 日期对象
	 * @param {String}
	 *            fmt 格式化字符串，如：'yyyy-MM-dd hh:mm:ss'
	 * @return {String} 格式化后的日期时间字符串
	 */
	dateTime2str : function(dt, fmt) {
		var z = {
			M : dt.getMonth() + 1,
			d : dt.getDate(),
			h : dt.getHours(),
			m : dt.getMinutes(),
			s : dt.getSeconds()
		};
		fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
			return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1)))
					.slice(-2);
		});
		return fmt.replace(/(y+)/g, function(v) {
			return dt.getFullYear().toString().slice(-v.length);
		});
	},
	/**
	 * 根据日期时间格式获取获取当前日期时间
	 * 
	 * @method dateTimeWrapper
	 * @param {String}
	 *            fmt 日期时间格式，如："yyyy-MM-dd hh:mm:ss";
	 * @return {String} 格式化后的日期时间字符串
	 */
	dateTimeWrapper : function(fmt) {
		if (arguments[0])
			fmt = arguments[0];
		return this.dateTime2str(new Date(), fmt);
	},
	/**
	 * 获取当前日期时间
	 * 
	 * @method getDatetime
	 * @param {String}
	 *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
	 * @return {String} 格式化后的日期时间字符串
	 */
	getDatetime : function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd hh:mm:ss');
	},
	/**
	 * 获取当前日期时间+毫秒
	 * 
	 * @method getDatetimes
	 * @param {String}
	 *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
	 * @return {String} 格式化后的日期时间字符串
	 */
	getDatetimes : function(fmt) {
		var dt = new Date();
		return this.dateTime2str(dt, fmt || 'yyyy-MM-dd hh:mm:ss') + '.'
				+ dt.getMilliseconds();
	},
	/**
	 * 获取当前日期（年-月-日）
	 * 
	 * @method getDate
	 * @param {String}
	 *            fmt [optional,default='yyyy-MM-dd'] 日期格式。
	 * @return {String} 格式化后的日期字符串
	 */
	getDate : function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd');
	},
	/**
	 * 获取当前时间（时:分:秒）
	 * 
	 * @method getTime
	 * @param {String}
	 *            fmt [optional,default='hh:mm:ss'] 日期格式。
	 * @return {String} 格式化后的时间字符串
	 */
	getTime : function(fmt) {
		return this.dateTimeWrapper(fmt || 'hh:mm:ss');
	},
	/**
	 * 将标准日期时间格式转换为长整形格式
	 * 
	 * @param {String}
	 *            datetime 为空或 yyyy-MM-dd hh:mm:ss 格式时间
	 * @returns {number}
	 */
	dateTime2Long : function(datetime) {
		if (datetime && typeof datetime === "string") {
			return new Date(datetime.replace(/\-/g, '/')).getTime();
		}
		return new Date().getTime();
	}
};
/**
 * 在原生String对象基础上添加自定义函数，如：字符串处理工具常用API,包括空白处理、字符统计、字符容器等.
 * 
 * @namespace Rose
 * @class string
 */
Rose.string = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose.string'
	 */
	toString : function() {
		return 'Rose.string';
	},
	/**
	 * 字符串容器类
	 * 
	 * @Class StringBuffer
	 * @constructor
	 */
	StringBuffer : function() {
		this._string = [];
		/**
		 * 向容器内追加数据。
		 * 
		 * @method append
		 * @param {String/Number}
		 *            str 追加字符串或数字
		 * @return {Object} Rose.string.StringBuffer
		 */
		this.append = function(str) {
			var t = typeof str;
			if (t === 'string' || t === 'number') {
				this._string.push(str);
			}
			return this;
		};
		/**
		 * 以字符串形式显示容器内数据
		 * 
		 * @method toString
		 * @param {String/Number}
		 *            spliter [optional,default=''] 字符串分隔符。
		 * @return {String} 容器内所有字符串行集合
		 */
		this.toString = function(spliter) {
			var t = typeof spliter;
			if (t !== 'string' && t !== 'number') {
				spliter = '';
			}
			return this._string.join(spliter);
		};
		/**
		 * 以数组形式显示容器内数据
		 * 
		 * @method toArray
		 * @return {Array} 容器数组
		 */
		this.toArray = function() {
			return this._string;
		};
	},
	/**
	 * 截取字符串(默认为10个字符)
	 * 
	 * @param string
	 *            str 传入的字符
	 * @param int
	 *            len 截取长度(单位为汉字，即2个字符)
	 * @param boolean
	 *            hasDot 是否加上...
	 * @return string
	 */
	substr : function(str, len, hasDot) {
		if (str == null)
			return;
		if (typeof len == 'undefined')
			len = 10;
		len *= 2;
		if (typeof hasDot == 'undefined')
			hasDot = true;
		var newLength = 0;
		var newStr = "";
		var chineseRegex = /[^\x00-\xff]/g;
		var singleChar = "";
		var strLength = str.replace(chineseRegex, "**").length;
		for ( var i = 0; i < strLength; i++) {
			singleChar = str.charAt(i).toString();
			if (singleChar.match(chineseRegex) != null) {
				newLength += 2;
			} else {
				newLength++;
			}
			if (newLength > len) {
				break;
			}
			newStr += singleChar;
		}

		if (hasDot && strLength > len) {
			newStr += "...";
		}
		return newStr;
	}
};

/**
 * 去掉字符串前面和最后的空格
 * 
 * @method trim
 * @return {String}
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的空格
 * 
 * @method trimBlanks
 * @return {String}
 */
String.prototype.trimBlanks = function() {
	return this.replace(/(\s*)/g, "");
};
/**
 * 去掉字符串前面(prefix)的空格blank
 * 
 * @method trimPreBlank
 * @return {String}
 */
String.prototype.trimPreBlank = function() {
	return this.replace(/(^\s*)/g, "");
};
/**
 * 去掉字符串后面(suffix)的空格blank
 * 
 * @method trimSufBlank
 * @return {String}
 */
String.prototype.trimSufBlank = function() {
	return this.replace(/(\s*$)/g, "");
};
/**
 * 去掉字符串中所有的character (<,>,&,")
 * 
 * @method trimChars
 * @param {String/Number}
 *            character 字符
 * @param {Boolean}
 *            caseSensitive [optional,default=false] 是否区分大小写
 * @return {String}
 */
String.prototype.trimChars = function(character, caseSensitive) {
	if (character === '') {
		character = ' ';
	}
	var i = 'i';
	if (caseSensitive) {
		i = '';
	}
	return this.replace(new RegExp("(" + character + ")", i + "g"), "");
};
/**
 * 去掉字符串最后面的','end//[逗号Comma]
 * 
 * @method trimCom
 * @return {String}
 */
String.prototype.trimCom = function() {
	return this.replace(/(\,$)/g, "");
};
/**
 * 去掉字符串中前面的'0'
 * 
 * @method trimZero
 * @return {String}
 */
String.prototype.trimPreZero = function() {
	return this.replace(/(^0*)/g, "");
};

/**
 * 计算字符串的长度（一个双字节字符按UTF-8长度计3(aaa)，ASCII字符计1）
 * 
 * @method sizeUTF8
 * @return {String}
 */
String.prototype.sizeUTF8 = function() {
	return this.replace(/[^\x00-\xff]/g, "aaa").length;
};
/**
 * 计算字符串的长度（一个双字节字符按DWORD长度计2(aa)，ASCII字符计1）
 * 
 * @method sizeDW
 * @return {String}
 */
String.prototype.sizeDW = function() {
	return this.replace(/[^\x00-\xff]/g, "aa").length;
};
/**
 * 清除前面和后面的换行符
 * 
 * @method trimLines
 * @return {String}
 */
String.prototype.trimLines = function() {
	return this.replace(/(^\n+)|(\n+$)/g, "");
};
/**
 * 将多个换行替换为一个
 * 
 * @method rowSpan
 * @return {String}
 */
String.prototype.rowSpan = function() {
	return this.replace(/(\n+)/g, "\n");
};
/**
 * 将\n替换为\r\n<br>
 * 在windows系统下，回车换行符号是"\r\n".但是在Linux等系统下是"\n"符号
 * 
 * @method lr2crlf
 * @return {String}
 */
String.prototype.lf2crlf = function() {
	return this.replace(/(\n+)/g, "\r\n");
};
/**
 * 格式化字符串,将{n},替换为对应的参数，如：'I {0}&{1} China.'.formatArgs('love','like'); 输出："I
 * love&like China."
 * 
 * @method formatArgs
 * @param {String/Number}
 *            arguments
 * @return {String}
 */
String.prototype.formatArgs = function() {
	var thiz = this;
	for ( var i = 0; i < arguments.length; i++) {
		var param = "\{" + i + "\}";
		thiz = thiz.replace(param, arguments[i]);
	}
	return thiz;
};
/**
 * 通过 HTTP 请求加载远程数据，底层依赖jQuery的AJAX实现。当前接口实现了对jQuery AJAX接口的进一步封装。
 * 
 * @namespace Rose
 * @class ajax
 */
Rose.ajax = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose.ajax'
	 */
	toString : function() {
		return 'Rose.ajax';
	},
	/**
	 * 请求状态码
	 * 
	 * @type {Object}
	 * @namespace Rose.ajax
	 * @class reqCode
	 */
	reqCode : {
		/**
		 * 成功返回码 200
		 * 
		 * @type {Number} 200
		 * @property SUCC
		 */
		SUCC : 200
	},
	/**
	 * 请求的数据类型
	 * 
	 * @type {Object}
	 * @namespace Rose.ajax
	 * @class reqDataType
	 */
	dataType : {
		/**
		 * 返回html类型
		 * 
		 * @type {String}
		 * @property HTML
		 */
		HTML : "html",
		/**
		 * 返回json类型
		 * 
		 * @type {Object}
		 * @property JSON
		 */
		JSON : "json",
		/**
		 * 返回text字符串类型
		 * 
		 * @type {String}
		 * @property TEXT
		 */
		TEXT : "text"
	},
	/**
	 * 超时,默认超时30000ms
	 * 
	 * @type {Number} 10000ms
	 * @property TIME_OUT
	 */
	TIME_OUT : 120000,
	/**
	 * 显示请求成功信息
	 * 
	 * @type {Boolean} false
	 * @property SHOW_SUCC_INFO
	 */
	SHOW_SUCC_INFO : false,
	/**
	 * 显示请求失败信息
	 * 
	 * @type {Boolean} false
	 * @property SHOW_ERROR_INFO
	 */
	SHOW_ERROR_INFO : false,
	/**
	 * GetJson是对Rose.ajax的封装,为创建 "GET" 请求方式返回 "JSON"(text) 数据类型
	 * 
	 * @method GetJson
	 * @param {String}
	 *            url HTTP(GET)请求地址
	 * @param {Object}
	 *            cmd json对象参数
	 * @param {Function}
	 *            callback [optional,default=undefined] GET请求成功回调函数
	 */
	getJson : function(url, cmd, callback) {
		if (arguments.length !== 3)
			callback = cmd, cmd = '';
		dataType = this.dataType.TEXT;
//		if(window.parent && window.parent.Rose){
//			url = window.parent.Rose.ajax.transferUrl(url);
//		}
		// var _this = this;
		// setTimeout( function(){_this.ajax(url, 'GET', cmd, dataType,
		// callback)},1000);
		this.ajax(url, 'GET', cmd, dataType, callback);
	},
	/**
	 * PostJsonAsync是对Rose.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型,
	 * 采用同步阻塞的方式调用ajax
	 * 
	 * @method PostJsonAsync
	 * @param {String}
	 *            url HTTP(POST)请求地址
	 * @param {Object}
	 *            cmd json对象参数
	 * @param {Function}
	 *            callback [optional,default=undefined] POST请求成功回调函数
	 */
	postJsonSync : function(url, cmd, callback) {
		dataType = this.dataType.TEXT;
//		if(window.parent && window.parent.Rose){
//			url = window.parent.Rose.ajax.transferUrl(url);
//		}
		this.ajax(url, 'GET', cmd, dataType, callback, true);
	},
	/**
	 * PostJson是对Rose.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型
	 * 
	 * @method PostJson
	 * @param {String}
	 *            url HTTP(POST)请求地址
	 * @param {Object}
	 *            cmd json对象参数
	 * @param {Function}
	 *            callback [optional,default=undefined] POST请求成功回调函数
	 */
	postJson : function(url, cmd, callback) {
		dataType = this.dataType.TEXT;
//		if(window.parent && window.parent.Rose){
//			url = window.parent.Rose.ajax.transferUrl(url);
//		}
		// var _this = this;
		// setTimeout( function(){_this.ajax(url, 'POST', cmd, dataType,
		// callback)},1000);
		this.ajax(url, 'GET', cmd, dataType, callback);
	},
	/**
	 * loadHtml是对Ajax load的封装,为载入远程 HTML 文件代码并插入至 DOM 中
	 * 
	 * @method loadHtml
	 * @param {Object}
	 *            obj Dom对象
	 * @param {String}
	 *            url HTML 网页网址
	 * @param {Function}
	 *            callback [optional,default=undefined] 载入成功时回调函数
	 */
	loadHtml : function(obj, url, data, callback) {
		$(obj).load(url, data, function(response, status, xhr) {
			callback = callback ? callback : function() {
			};
			status == "success" ? callback(true) : callback(false);
		});
	},
	/**
	 * loadTemp是对handlebars 的封装,请求模版加载数据
	 * 
	 * @method loadTemp
	 * @param {Object}
	 *            obj Dom对象
	 * @param {Object}
	 *            temp 模版
	 * @param {Object}
	 *            data 数据
	 */
	loadTemp : function(obj, temp, data) {
		var template = Handlebars.compile(temp.html());
		$(obj).html(template(data));
	},
	/**
	 * GetHtml是对Rose.ajax的封装,为创建 "GET" 请求方式返回 "hmtl" 数据类型
	 * 
	 * @method GetHtml
	 * @param {String}
	 *            url HTTP(GET)请求地址
	 * @param {Object}
	 *            cmd json对象参数
	 * @param {Function}
	 *            callback [optional,default=undefined] GET请求成功回调函数
	 */
	getHtml : function(url, cmd, callback) {
		if (arguments.length !== 3)
			callback = cmd, cmd = '';
		dataType = this.dataType.HTML;
		this.ajax(url, 'GET', cmd, dataType, callback);
	},
	/**
	 * GetHtmlSync是对Rose.ajax的封装,为创建 "GET" 请求方式返回 "hmtl" 数据类型
	 * 采用同步阻塞的方式调用ajax
	 * 
	 * @method GetHtml
	 * @param {String}
	 *            url HTTP(GET)请求地址
	 * @param {Object}
	 *            cmd json对象参数
	 * @param {Function}
	 *            callback [optional,default=undefined] GET请求成功回调函数
	 */
	getHtmlSync : function(url, cmd, callback) {
		if (arguments.length !== 3)
			callback = cmd, cmd = '';
		dataType = this.dataType.HTML;
		this.ajax(url, 'GET', cmd, dataType, callback,true);
	},
	/**
	 * 基于jQuery ajax的封装，可配置化
	 * 
	 * @method ajax
	 * @param {String}
	 *            url HTTP(POST/GET)请求地址
	 * @param {String}
	 *            type POST/GET
	 * @param {Object}
	 *            cmd json参数命令和数据
	 * @param {String}
	 *            dataType 返回的数据类型
	 * @param {Function}
	 *            callback [optional,default=undefined] 请求成功回调函数,返回数据data和isSuc
	 */
	ajax : function(url, type, cmd, dataType, callback, sync) {
		var param = "";
		if (typeof (cmd) == "object"){
			param = JSON.stringify(cmd);
		}else if(typeof(cmd)=="string"){
			param = cmd;
		}
		//cmd = this.jsonToUrl(cmd);
		async = sync ? false : true;
		//Rose.log(cmd);
		var thiz = Rose.ajax;
		var cache = (dataType == "html") ? true : false;
		$
				.ajax({
					url : url,
					type : type,
					data : param,
					cache : cache,
					dataType : dataType,
					async : async,
					timeout : thiz.TIME_OUT,
					beforeSend : function(xhr) {
						xhr.overrideMimeType("text/plain; charset=utf-8");
						xhr.setRequestHeader("Content-Type","text/plain");
					},
					success : function(data) {
						if (!data) {
							return;
						}
						if (dataType == "html") {
							callback(data, true);
							return;
						}
						try {
							// data = $.parseJSON(data);
							data = eval('(' + data + ')');
							if (data.retCode=='PAGEFRAME-9527') {
								alert("登陆凭证过期，请重新登陆");
								window.parent.location.reload();
								return;
							}
						} catch (e) {
							alert("JSON Format Error:" + e.toString());
						}
						var isSuc = thiz.printReqInfo(data);
						if (callback && data) {
							callback(data || {}, isSuc);
						}
					},
					error : function() {
					    var retErr ={};
					    retErr['retCode']="SCRM-404";
					    retErr['retMessage']="网络异常或超时，请稍候再试！"; 
						callback(retErr, false);
					}
				});
	},
	/**
	 *URL后面追加手机号 
	 */
	transferUrl : function(url){
	    var billId = "";
	    if($('#custSelect .current a').length>0){
	        billId = $('#custSelect .current a').data('uid');
	    }
	    billId =(billId)?billId:Rose.browser.getParameter("billID");
	    if(url && (url.indexOf('?') == -1)){
	        url = url +"?billID="+billId;
	    }else{
	      url = url +"&billID="+billId;
	    }
	    return url;
	},
	/**
	 * 打开请求返回代码和信息
	 * 
	 * @method printRegInfo
	 * @param {Object}
	 *            data 请求返回JSON数据
	 * @return {Boolean} true-成功; false-失败
	 */
	printReqInfo : function(data) {
		if (!data)
			return false;
		var code = data.retCode, msg = data.retMessage, succ = this.reqCode.SUCC;
		if (code == succ) {
			if (this.SHOW_SUCC_INFO) {
				// Rose.msg.infoCorrect([ msg, ' [', code, ']' ].join(''));
				Rose.msg.infoCorrect(msg);
			}
		} else {
			// Rose.msg.infoAlert([ msg, ' [', code, ']' ].join(''));
			if (this.SHOW_ERROR_INFO) {
				art.dialog.tips(msg);
			}
		}
		return !!(code == succ);
	},
	/**
	 * JSON对象转换URL参数
	 * 
	 * @method printRegInfo
	 * @param {Object}
	 *            json 需要转换的json数据
	 * @return {String} url参数字符串
	 */
	jsonToUrl : function(json) {
		var temp = [];
		for ( var key in json) {
			if (json.hasOwnProperty(key)) {
				var _key = json[key] + "";
				_key = _key.replace(/\+/g, "%2B");
				_key = _key.replace(/\&/g, "%26");
				temp.push(key + '=' + _key);
			}
		}
		return temp.join("&");
	},
	msg : {
		"suc" : function(obj, text) {
			var _text = text || "数据提交成功！";
			$(obj).html(
					'<div class="msg-hint">' + '<h3 title=' + _text
							+ '><i class="hint-icon hint-suc-s"></i>' + _text
							+ '</h3>' + '</div>').show();
		},
		"war" : function(obj, text) {
			var _text = text || "数据异常，请稍后尝试!";
			$(obj).html(
					'<div class="msg-hint">' + '<h3 title=' + _text
							+ '><i class="hint-icon hint-war-s"></i>' + _text
							+ '</h3>' + '</div>').show();
		},
		"err" : function(obj, text) {
			var _text = text || "数据提交失败!";
			$(obj).html(
					'<div class="msg-hint">' + '<h3 title=' + _text
							+ '><i class="hint-icon hint-err-s"></i>' + _text
							+ '</h3>' + '</div>').show();
		},
		"load" : function(obj, text) {
			var _text = text || "正在加载中，请稍候...";
			$(obj).html(
					'<div class="msg-hint">' + '<h3 title=' + _text
							+ '><i class="hint-loader"></i>' + _text + '</h3>'
							+ '</div>').show();
		},
		"inf" : function(obj, text) {
			var _text = text || "数据提交中，请稍等...";
			$(obj).html(
					'<div class="msg-hint">' + '<h3 title=' + _text
							+ '><i class="hint-icon hint-inf-s"></i>' + _text
							+ '</h3>' + '</div>').show();
		},
		"errorInfo" : function(obj, text) {
			var _text = text || "数据提交失败!";
			$(obj)
					.html(
							'<div class="ui-tiptext-container ui-tiptext-container-message"><p class="ui-tiptext ui-tiptext-message">'
									+ '<i class="ui-tiptext-icon icon-message" title="阻止"></i>'
									+ _text + '</p>' + '</div>').show();
		}
	}
};

/**
 * 页面提示信息
 * 
 * @namespace Rose
 * @class msg
 */
Rose.msg = {
	/**
	 * 显示当前对象名称路径。
	 * 
	 * @method toString
	 * @return {String} 'Rose.msg'
	 */
	toString : function() {
		return 'Rose.msg';
	},
	/**
	 * 普通信息提示。
	 * 
	 * @method infoAlert
	 * @param {String}
	 *            info 信息
	 * @param {Number}
	 *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoAlert : function(info, seconds) {
		this._infoImpl(info, 'c_alert_f', seconds);
	},
	/**
	 * 正确信息提示。
	 * 
	 * @method infoCorrect
	 * @param {String}
	 *            info 信息
	 * @param {Number}
	 *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoCorrect : function(info, seconds) {
		this._infoImpl(info, 'c_correct_f', seconds);
	},
	/**
	 * 警告信息提示。
	 * 
	 * @method infoWarning
	 * @param {String}
	 *            info 信息
	 * @param {Number}
	 *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoWarning : function(info, seconds) {
		this._infoImpl(info, 'c_warning_f', seconds);
	},
	/**
	 * 错误信息提示。
	 * 
	 * @method infoError
	 * @param {String}
	 *            info 信息
	 * @param {Number}
	 *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除。
	 */
	infoError : function(info, seconds) {
		this._infoImpl(info, 'c_error_f', seconds);
	},
	/**
	 * 清除提示信息。
	 * 
	 * @method infoClear
	 */
	infoClear : function() {
		$('#c_msg_x').remove();
	},
	/**
	 * 通用提示信息样式为.c_correct。
	 * 
	 * @method _infoImpl
	 * @param {String}
	 *            info 提示信息
	 * @param {String}
	 *            cls 样式
	 * @param {Number}
	 *            seconds [optional,default=5] 等待关闭秒数。小于0表示一直显示，直到被下一条覆盖或搬运清除
	 */
	_infoImpl : function(info, cls, seconds) {
		$('#c_msg_x').remove();
		var cMsgObj = $('<span id="c_msg_x"></span>');
		cMsgObj.css({
			position : 'absolute'
		}).addClass(cls).html(info);
		var body = $('body');
		if (seconds < 0) {
			body.prepend(cMsgObj);
		} else {
			seconds = (seconds == undefined ? 5 : seconds);
			body.prepend(cMsgObj.fadeIn().delay(seconds * 1000).fadeOut());
		}
		var _msg_x = $('#c_msg_x'), top_orig = _msg_x.position().top, _resetPos = function(
				top_orig) {
			_msg_x.delay(10).css({
				left : (body.width() - _msg_x.width()) / 2,
				top : top_orig + $(document).scrollTop()
			});
		};
		_resetPos(top_orig);
		$(window).bind('resize scroll', function() {
			_resetPos(top_orig);
		});
	}
};

/**
 * 浏览器工具集 (版本，参数，返回，前进，刷新)
 * 
 * @namespace Rose
 * @class string
 */
Rose.browser = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose.string'
	 */
	toString : function() {
		return 'Rose.browser';
	},
	/**
	 * 浏览器UA
	 * 
	 * @name Rose.browser.ua
	 * @return {String} 浏览器UA
	 */
	ua : navigator.userAgent.toLowerCase(),

	/**
	 * ie
	 * 
	 * @name Rose.browser.ie
	 * @return {Boolean} true/false
	 */
	ie : /msie/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie6
	 * 
	 * @name Rose.browser.ie6
	 * @return {Boolean} true/false
	 */
	ie6 : /msie 6/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie7
	 * 
	 * @name Rose.browser.ie7
	 * @return {Boolean} true/false
	 */
	ie7 : /msie 7/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie8
	 * 
	 * @name Rose.browser.ie8
	 * @return {Boolean} true/false
	 */
	ie8 : /msie 8/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie9
	 * 
	 * @name Rose.browser.ie9
	 * @return {Boolean} true/false
	 */
	ie9 : /msie 9/.test(navigator.userAgent.toLowerCase()),
	/**
	 * firefox
	 * 
	 * @name Rose.browser.firefox
	 * @return {Boolean} true/false
	 */
	firefox : /firefox\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase()),
	/**
	 * chrome
	 * 
	 * @name Rose.browser.chrome
	 * @return {Boolean} true/false
	 */
	chrome : /chrome\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase()),
	/**
	 * opera
	 * 
	 * @name Rose.browser.opera
	 * @return {Boolean} true/false
	 */
	opera : /opera/.test(navigator.userAgent.toLowerCase()),
	// safari: /safari/.test(navigator.userAgent.toLowerCase()),
	/**
	 * webkit
	 * 
	 * @name Rose.browser.webkit
	 * @return {Boolean} true/false
	 */
	webkit : /webkit/.test(navigator.userAgent.toLowerCase()),
	/**
	 * 获取URL地址栏参数值
	 * 
	 * @method getParameter
	 * @param {String}
	 *            name 参数名
	 * @param {String}
	 *            url [optional,default=当前URL]URL地址
	 * @return {String} 参数值
	 */
	getParameter : function(name, url) {
		var paramStr = url || window.location.search;
		if (paramStr.length == 0) {
			return null;
		}
		if (paramStr.charAt(0) != "?") {
			return null;
		}
		paramStr = unescape(paramStr).substring(1);
		if (paramStr.length == 0) {
			return null;
		}
		var params = paramStr.split('&');
		for ( var i = 0; i < params.length; i++) {
			var parts = params[i].split('=', 2);
			if (parts[0] == name) {
				if (parts.length < 2 || typeof (parts[1]) === "undefined"
						|| parts[1] == "undefined" || parts[1] == "null")
					return '';
				return parts[1];
			}
		}
		return null;
	},
	/**
	 * 将 uri 的查询字符串参数映射成对象
	 * 
	 * @method mapQuery
	 * @param {String}
	 *            uri 要映射的 uri
	 * @return {Object} 按照 uri 映射成的对象
	 * 
	 * @example var queryObj =
	 *          Rose.browser.mapQuery("http://www.10086.com/?bb=4765078&style=blue"); //
	 *          queryObj 则得到一个{bb:"4765078", style:"blue"}的对象。
	 * 
	 */
	mapQuery : function(uri) {
		var i, key, value, uri = uri && uri.split('#')[0]
				|| window.location.search, // remove hash
		index = uri.indexOf("?"), pieces = uri.substring(index + 1).split("&"), params = {};
		if (index === -1) {// 如果连?号都没有,直接返回,不再进行处理.
			return params;
		}
		for (i = 0; i < pieces.length; i++) {
			try {
				index = pieces[i].indexOf("=");
				key = pieces[i].substring(0, index);
				value = pieces[i].substring(index + 1);
				if (!(params[key] = unescape(value))) {
					throw new Error(
							"uri has wrong query string when run mapQuery.");
				}
			} catch (e) {
				// Rose.log("错误：[" + e.name + "] "+e.message+", " +
				// e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack,
				// 2);
			}
		}
		return params;
	},
	/**
	 * 转到上一页（缓存页）
	 * 
	 * @method goPrevPage
	 * @return Rose.browser
	 */
	goPrevPage : function() {
		history.go(-1);
		return this;
	},
	/**
	 * 转到下一页
	 * 
	 * @method goNextPage
	 * @return Rose.browser
	 */
	goNextPage : function() {
		history.go(1);
		return this;
	},
	/**
	 * 转到当前页(刷新页面)
	 * 
	 * @method refreshPage
	 * @return Rose.browser
	 */
	refreshPage : function() {
		history.go(0);
		return this;
	},
	/**
	 * 获取域名或主机IP
	 * 
	 * @method getHost
	 * @return {String}
	 */
	getHost : function() {
		return location.host.split(':')[0];
	},
	/**
	 * Firefox需要手动开启dom.allow_scripts_to_close_windows<br>
	 * about:config -> dom.allow_scripts_to_close_windows = true。
	 * 
	 * @method closeWin
	 */
	closeWin : function() {
		window.opener = null;
		window.open('', '_self');
		window.close();
	},
	/**
	 * 设置主页
	 * 
	 * @method setHomepage
	 * @param {String}
	 *            url 设置的URL
	 * @return Rose.browser
	 */
	setHomepage : function(url) {
		url = (url ? url : location.href);
		if (document.all) {
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(url);
		} else if (window.sidebar) {
			if (window.netscape) {
				try {
					window.netscape.security.PrivilegeManager
							.enablePrivilege("UniversalXPConnect");
				} catch (e) {
					alert('此操作被浏览器拒绝！请在地址栏输入"about:config"并回车然后将[signed.applets.codebase_principal_support]的值设置为true');
				}
			}
			try {
				var prefs = Components.classes['@mozilla.org/preferences-service;1']
						.getService(Components.interfaces.nsIPrefBranch);
				prefs.setCharPref('browser.startup.homepage', url);
			} catch (e) {
				alert('设置失败');
			}
		} else {
			alert('请用Ctrl+D将地址添加到收藏夹');
		}
		return this;
	}
};
/**
 * cookie 操作，设置，取出，删除
 * 
 * @namespace Rose
 * @class string
 */
Rose.cookie = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose.string'
	 */
	toString : function() {
		return 'Rose.cookie';
	},
	/**
	 * 设置一个cookie
	 * 
	 * @method set
	 * @param {String}
	 *            name cookie名称
	 * @param {String}
	 *            value cookie值
	 * @param {String}
	 *            path 所在路径
	 * @param {Number}
	 *            expires 存活时间，单位:小时
	 * @param {String}
	 *            domain 所在域名
	 * @return {Boolean} 是否成功
	 */
	set : function(name, value, expires, path, domain) {
		var str = name + "=" + encodeURIComponent(value);
		if (expires != null || expires != '') {
			if (expires == 0) {
				expires = 100 * 365 * 24 * 60;
			}
			var exp = new Date();
			exp.setTime(exp.getTime() + expires * 60 * 1000);
			str += "; expires=" + exp.toGMTString();
		}
		if (path) {
			str += "; path=" + path;
		}
		if (domain) {
			str += "; domain=" + domain;
		}
		document.cookie = str;
	},
	/**
	 * 获取指定名称的cookie值
	 * 
	 * @method get
	 * @param {String}
	 *            name cookie名称
	 * @return {String} 获取到的cookie值
	 */
	get : function(name) {
		var v = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
		return v ? decodeURIComponent(v[1]) : null;
	},
	/**
	 * 删除指定cookie,复写为过期
	 * 
	 * @method remove
	 * @param {String}
	 *            name cookie名称
	 * @param {String}
	 *            path 所在路径
	 * @param {String}
	 *            domain 所在域
	 */
	remove : function(name, path, domain) {
		document.cookie = name + "=" + ((path) ? "; path=" + path : "")
				+ ((domain) ? "; domain=" + domain : "")
				+ "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
};
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
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isArray : function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Array]';
	},
	/**
	 * 是否为空
	 * 
	 * @method isEmpty
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isEmpty : function(obj) {
		return obj === null || typeof obj === 'undefined' || obj === 0
				|| obj === false || obj === ''
				|| (typeof obj.length === 'number' && obj.length === 0);
	},
	/**
	 * 是否为数值
	 * 
	 * @method isNumber
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isNumber : function(obj) {
		return typeof (obj) === 'number';
	},
	/**
	 * 是否为字符
	 * 
	 * @method isString
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isString : function(obj) {
		return typeof (obj) === 'string';
	},
	/**
	 * 是否为布尔值
	 * 
	 * @method isBoolean
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isBoolean : function(obj) {
		return typeof (obj) === 'boolean';
	},
	/**
	 * 是否为对象
	 * 
	 * @method isObject
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isObject : function(obj) {
		return typeof (obj) === 'object';
	},
	/**
	 * 是否为函数
	 * 
	 * @method isFunction
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isFunction : function(obj) {
		return typeof (obj) === 'function';
	},
	/**
	 * 是否为 undefined
	 * 
	 * @method isUndefined
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isUndefined : function(obj) {
		return o === undefined;
	},
	/**
	 * 是否为 null
	 * 
	 * @method isNull
	 * @param {All}
	 *            obj 主体
	 * @return {Boolean} true/false
	 */
	isNull : function(obj) {
		return o === null;
	}
};
/**
 * 常用正则表达式
 * 
 * @namespace Rose
 * @class regexp
 */
Rose.validate = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} Rose.regexp
	 */
	toString : function() {
		return 'Rose.validate';
	},
	/**
	 * 正则集
	 * 
	 * @type {Object}
	 * @namespace Rose.validate
	 * @class regexp
	 */
	regexp : {
		intege : "^-?[1-9]\\d*$", // 整数
		intege1 : "^[1-9]\\d*$", // 正整数
		intege2 : "^-[1-9]\\d*$", // 负整数
		num : "^([+-]?)\\d*\\.?\\d+$", // 数字
		num1 : "^[1-9]\\d*|0$", // 正数（正整数 + 0）
		num2 : "^-[1-9]\\d*|0$", // 负数（负整数 + 0）
		decmal : "^([+-]?)\\d*\\.\\d+$", // 浮点数
		decmal1 : /^[0-9]*.?\d*$/, // 正浮点数
		decmal2 : "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", // 负浮点数
		decmal3 : "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", // 浮点数
		decmal4 : "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", // 非负浮点数（正浮点数 +
																// 0）
		decmal5 : "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", // 非正浮点数（负浮点数
																	// + 0）
		email : "/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i", // 邮件
		color : "^[a-fA-F0-9]{6}$", // 颜色
		url : "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", // url
		chinese : "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", // 仅中文
		ascii : "^[\\x00-\\xFF]+$", // 仅ACSII字符
		zipcode : "^\\d{6}$", // 邮编
		mobile : "/^(13[0-9]|15[0-9]|14[7|5]|18[0-9])\d{8}$/", // 手机
		mobile1 : "^(1[3-8])\\d{9}$",
		ip4 : "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", // ip地址
		picture : "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", // 图片
		rar : "(.*)\\.(rar|zip|7zip|tgz)$", // 压缩文件
		date : "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", // 日期
		qq : "^[1-9]*[1-9][0-9]*$", // QQ号码
		tel : "^(([0\\+]\\d{2,3}(-)?)?(0\\d{2,3})(-)?)?(\\d{7,8})(-(\\d{3,}))?$", // 电话号码的函数(包括验证国内区号,国际区号,分机号)
		name : "^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]([\\s.]?[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]+){1,}$", // 真实姓名由汉字、英文字母、空格和点组成，不能以空格开头至少两个字
		addressname : "^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]{1,}$", // 收货人
		username : "^[0-9a-zA-Z_\u0391-\uFFE5]{3,15}$", // 用来用户注册。匹配由数字、26个英文字母中文或者下划线组成的字符串
														// 3-15个字符串之间
		letter : "^[A-Za-z]+$", // 字母
		letter_u : "^[A-Z]+$", // 大写字母
		letter_l : "^[a-z]+$", // 小写字母
		idcard : "^[1-9]([0-9]{14}|[0-9]{16}[0-9xX])$", // 身份证
		passwrd : "^[\\w-@#$%^&*]{6,20}$", // 密码保证6-20位的英文字母/数字/下划线/减号和@#$%^&*这些符号
		scripts : "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]", // 特殊字符
		notempty : function(value) {
			return value.length > 0;
		}
	},
	/**
	 * 格式校验方法
	 * 
	 * @method Check
	 * @param {String}
	 *            type 验证类型
	 * @param {String}
	 *            value 验证值
	 */
	Check : function(type, value) {
		var _reg = this.regexp[type];
		if (_reg == undefined) {
			alert("Type " + type + " is not in the data");
			return false;
		}
		var reg;
		if (typeof _reg == "string") {
			reg = new RegExp(_reg);
		} else if ((typeof _reg) == "function") {
			return _reg(value);
		} else {
			reg = _reg[type];
		}
		return reg.test(value);
	}
};

/**
 * DOM元素操作
 * 
 * @namespace Rose
 * @class string
 */
Rose.dom = {
	/**
	 * 显示当前对象名称路径
	 * 
	 * @method toString
	 * @return {String} 'Rose.dom'
	 */
	toString : function() {
		return 'Rose.dom';
	},
	/**
	 * 点击隐藏(失去焦点后,点击元素以外区域后,元素隐藏)
	 * 
	 * @method clickHide
	 * @param {Object}
	 *            obj 主对象
	 * @example Rose.dom.clickHide($('#test'))
	 */
	clickHide : function(obj) {
		var $this = $(obj);
		var mouseInsideTag = false;

		$this.show();

		$this.hover(function() {
			mouseInsideTag = true;
		}, function() {
			mouseInsideTag = false;
		});

		$("#JS_toggleFav").hover(function() {
			mouseInsideTag = true;
		}, function() {
			mouseInsideTag = false;
		});

		$("html,body").mouseup(function() {
			if (!mouseInsideTag)
				$this.hide();
		});
	},
	/**
	 * 自动页面滚动至某元素
	 * 
	 * @method autoScroll
	 * @param {All}
	 *            obj 主体
	 * @param {Object}
	 *            obj 主对象
	 * @param {Number}
	 *            time 页面滚动至某元素所需时间
	 * @example Rose.dom.autoScroll($('#goTop'),100)
	 */
	autoScroll : function(obj, time) {
		var $this = $(obj);
		if (!time)
			time = 500;
		var $top = $this.offset().top;
		$('html,body').animate({
			scrollTop : $top
		}, time);
	},
	/**
	 * 表单中的默认字符,点击后隐藏这些字符
	 * 
	 * @method defaultChars
	 * @param {All}
	 *            obj 主体
	 * @example &lt;input type="text" defaultchars="搜索关键字 比如：(Rose come
	 *          back)"&gt;
	 */
	defaultChars : function(obj) {
        obj.each(function() {
            var $this = $(this);
            if($this.is('.disabled'))
                return;
            var $defaultchars = $this.attr('defaultchars');
            var oldColor = $this.css('color');
            if (!$this.val())
                $this.val($defaultchars).css('color', '#999');
            $this.focusin(function () {
	            $defaultchars = $this.attr('defaultchars');
                if ($this.val() == $defaultchars)
                    $this.val('').css('color', oldColor);
            }).focusout(function () {
	            $defaultchars = $this.attr('defaultchars');
                if ($this.val() == '')
                    $this.val($defaultchars).css('color', '#999');
                ;
            });
        });
	},
	/**
	 * 获取焦点时的样式
	 * 
	 * @method focusClass
	 * @param {Object}
	 *            obj 主对象
	 * @param {String}
	 *            styleclass 样式名称
	 * @example Rose.dom.focusClass($('#username'),"highRed");
	 */
	focusClass : function(obj, styleclass) {
		var $this = $(obj);
		$this.focus(function() {
			$this.toggleClass(styleclass);
		}).blur(function() {
			$this.toggleClass(styleclass);
		});
	},
	/**
	 * 滑至元素和移除元素时的样式切换
	 * 
	 * @method hoverClass
	 * @param {Object}
	 *            obj 主对象
	 * @param {String}
	 *            styleclass 样式名称
	 */
	hoverClass : function(obj, styleclass) {
		var $this = $(obj);
		$this.hover(function() {
			$(this).toggleClass(styleclass);
		}, function() {
			$(this).toggleClass(styleclass);
		});
	},
	/**
	 * 点击给元素添加样式，并移除已有元素的样式，提供多选参数
	 * 
	 * @method clickClass
	 * @param {Object}
	 *            obj 主对象
	 * @param {String}
	 *            styleclass 样式名称
	 * @param {boolean}
	 *            mult [optional,default=false] 是否为多选，默认为单选
	 */
	clickClass : function(obj, styleclass, mult) {
		var $this = $(obj);
		if (mult == undefined) {
			var mult = false;
		}
		$this.click(function() {
			if (!mult) {
				$this.removeClass(styleclass);
			}
			$(this).addClass(styleclass);
		});
	},
	/**
	 * 实现号码格式化高亮,字母转换为大些，便于输入时检测错误
	 * 
	 * @method clickClass
	 * @param {Object}
	 *            opt.obj 对象
	 * @param {String}
	 *            opt.space 间隔类型, MOBILE,SIM,IMEI
	 * @param {String}
	 *            opt.msg 提示信息 Rose.dom.zoomTips({ obj:$("#i-moblie"),
	 *            space:"MOBILE", msg:"手机号码是11位数字" });
	 */
	zoomTips : function(opt) {
		var obj = opt.obj, space = opt.space || "MOBILE", msg = opt.msg || "";

		$(obj).focus(function(evt) {
			if (this.value.length > 0) {
				setPosition(this);
				setChanges(this);
			}
		});
		$(obj).keyup(function(evt) {
			if (this.value.length == 0) {
				setHide();
			} else {
				setPosition(this);
			}
			setChanges(this);
		});
		$(obj).blur(function(evt) {
			setHide();
			this.value = this.value;
		});

		var zoomObj = "#Rose-zoomTips-" + $(obj).attr("id");
		(function zoomTips() {
			$("body").append(
					'<div class="Rose-zoomTips fn-hide" id="'
							+ zoomObj.replace("#", '') + '">'
							+ '<div class="Rose-zoomTips-cnt"></div>'
							+ '</div>');
			if (space == "MOBILE") {
				$(zoomObj).css({
					"width" : "236px"
				});
			} else if (space == "IMEI") {
				$(zoomObj).css({
					"width" : "184px"
				});
			}
		})();

		// 设置提示层的left和top
		function setPosition(evt) {
			var y = 20;
			y = $(evt).outerHeight();
			$(zoomObj).removeClass("fn-hide");
			var t = $(evt).offset().top;
			var l = $(evt).offset().left;
			$(zoomObj).css({
				"top" : (t + y) + "px",
				"left" : l + "px"
			});
		}
		// 设置改变提示层的内容
		function setChanges(e) {
			var i = e.value;
			i = $.trim(i);
			if (space == "MOBILE") {

				var h = i.substring(0, 3);
				i = i.substring(3);
				while (i && i.length > 0) {
					h += " " + i.substring(0, 6);
					i = i.substring(6);
				}
			} else if (space == "SIM" || space == "IMEI") {
				var h = i.substring(0, 5);
				i = i.substring(5);
				while (i && i.length > 0) {
					h += " " + i.substring(0, 5);
					i = i.substring(5);
				}
				h = h.toUpperCase();
			}

			$(zoomObj).children(".Rose-zoomTips-cnt").html(h);
		}
		// 隐藏提示层
		function setHide() {
			$(zoomObj).addClass("fn-hide");
		}
	}
};
