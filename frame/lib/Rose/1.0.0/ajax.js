/**
 * 通过 HTTP 请求加载远程数据，底层依赖jQuery的AJAX实现。当前接口实现了对jQuery AJAX接口的进一步封装。
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
	toString : function () {
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
	TIME_OUT : 30000,
	/**
	 * 显示请求成功信息
	 *
	 * @type {Boolean} false
	 * @property SHOW_SUCC_INFO
	 */
	SHOW_SUCC_INFO : false,
	/**
	 * GetJson是对Rose.ajax的封装,为创建 "GET" 请求方式返回 "JSON"(text) 数据类型
	 *
	 * @method GetJson
	 * @param {String} url HTTP(GET)请求地址
	 * @param {Object} cmd json对象参数
	 * @param {Function} callback [optional,default=undefined] GET请求成功回调函数
	 */
	getJson : function (url, cmd, callback) {
		if(arguments.length !== 3) callback = cmd, cmd='';
		dataType = this.dataType.TEXT;
		this.ajax(url, 'GET', cmd, dataType, callback);
	},
	/**
	 * PostJsonAsync是对Rose.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型, 采用同步阻塞的方式调用ajax
	 *
	 * @method PostJsonAsync
	 * @param {String} url HTTP(POST)请求地址
	 * @param {Object} cmd json对象参数
	 * @param {Function} callback [optional,default=undefined] POST请求成功回调函数
	 */
	postJsonSync : function (url, cmd, callback) {
		dataType = this.dataType.TEXT;
		this.ajax(url, 'POST', cmd, dataType, callback, true);
	},
	/**
	 * PostJson是对Rose.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型
	 *
	 * @method PostJson
	 * @param {String} url HTTP(POST)请求地址
	 * @param {Object} cmd json对象参数
	 * @param {Function} callback [optional,default=undefined] POST请求成功回调函数
	 */
	postJson : function (url, cmd, callback) {
		dataType = this.dataType.TEXT;
		this.ajax(url, 'POST', cmd, dataType, callback);
	},
	/**
	 * loadHtml是对Ajax load的封装,为载入远程 HTML 文件代码并插入至 DOM 中
	 *
	 * @method loadHtml
	 * @param {Object} obj Dom对象
	 * @param {String} url HTML 网页网址
	 * @param {Function} callback [optional,default=undefined] 载入成功时回调函数
	 */
	loadHtml:function (obj, url, data, callback) {
		$(obj).load(url, data, function(response, status, xhr){
			callback = callback ? callback : function(){};  
			status=="success" ? callback(true) : callback(false);
		});
	},
	/**
	 * loadTemp是对handlebars 的封装,请求模版加载数据
	 *
	 * @method loadTemp
	 * @param {Object} obj Dom对象
	 * @param {Object} temp 模版
	 * @param {Object} data 数据
	 */
	loadTemp:function (obj, temp, data) {
		var template = Handlebars.compile(temp.html());
	    $(obj).html(template(data));	
	},
	/**
	 * GetHtml是对Rose.ajax的封装,为创建 "GET" 请求方式返回 "hmtl" 数据类型
	 *
	 * @method GetHtml
	 * @param {String} url HTTP(GET)请求地址
	 * @param {Object} cmd json对象参数
	 * @param {Function} callback [optional,default=undefined] GET请求成功回调函数
	 */
	getHtml : function (url, cmd, callback) {
		/* start UEStory */
		var trackName = typeof trackUrl == 'undefined' ? url : trackUrl;                    
        try { UEStory.trackPV(trackName); } catch(e) {}		
        /* end UEStory */
		if(arguments.length !== 3) callback = cmd, cmd='';
		dataType = this.dataType.HTML;
		this.ajax(url, 'GET', cmd, dataType, callback);
	},
	/**
	 * 基于jQuery ajax的封装，可配置化
	 *
	 * @method ajax
	 * @param {String} url HTTP(POST/GET)请求地址
	 * @param {String} type POST/GET
	 * @param {Object} cmd json参数命令和数据
	 * @param {String} dataType 返回的数据类型
	 * @param {Function} callback [optional,default=undefined]
	 *                  请求成功回调函数,返回数据data和isSuc
	 */
	ajax : function (url, type, cmd, dataType, callback, sync) {
		cmd = this.jsonToUrl(cmd);
		sync = sync ? false : true; 
		Rose.log(cmd);
		var thiz = Rose.ajax;
		$.ajax({
			url : url,
			type : type,
			data : cmd,
			cache: false,
			dataType : dataType,
			async: sync,
			timeout : thiz.TIME_OUT,
			success : function (data) {
				if(!data) {
					return;
				}
				if(dataType == "html"){
					callback(data,true);
					return;
				}
				try {
					//data = $.parseJSON(data);
					data=eval('('+data+')');
					data = data.data;
				} catch (e) {
					alert("JSON Format Error:" + e.toString());
					//Rose.msg.infoError("JSON Format Error:" + e.toString());
				}
				var isSuc = thiz.printReqInfo(data);
				if(callback && data) {
					callback(data || {}, isSuc);
				}
			},
			error : function () {
				callback("error",false);
			}
		});
	},
	/**
	 * 打开请求返回代码和信息
	 *
	 * @method printRegInfo
	 * @param {Object} data 请求返回JSON数据
	 * @return {Boolean} true-成功; false-失败
	 */
	printReqInfo : function(data){
		if(!data)
			return false;
		var code = data.code, msg = data.msg, succ = this.reqCode.SUCC;
		if(code == succ) {
			if(this.SHOW_SUCC_INFO) {
				Rose.msg.infoCorrect([ msg, ' [', code, ']' ].join(''));
			}
		} else {
			Rose.msg.infoAlert([ msg, ' [', code, ']' ].join(''));
		}
		return !!(code == succ);
	},
	/**
	 * JSON对象转换URL参数
	 *
	 * @method printRegInfo
	 * @param {Object} json 需要转换的json数据
	 * @return {String} url参数字符串
	 */
	jsonToUrl:function(json){
		var temp = [];
		for(var key in json){
			if(json.hasOwnProperty(key)){
				temp.push(key + '='+ json[key]);	
			}
		}
		return temp.join("&");
	}
};
