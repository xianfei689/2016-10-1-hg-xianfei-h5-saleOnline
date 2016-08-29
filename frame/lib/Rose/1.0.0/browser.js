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
	 * @name Rose.browser.ua
	 * @return {String} 浏览器UA
	 */
	ua:navigator.userAgent.toLowerCase(),

	/**
	 * ie 
	 * @name Rose.browser.ie
	 * @return {Boolean} true/false
	 */
	ie: /msie/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie6 
	 * @name Rose.browser.ie6
	 * @return {Boolean} true/false
	 */
	ie6: /msie 6/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie7
	 * @name Rose.browser.ie7
	 * @return {Boolean} true/false
	 */
	ie7: /msie 7/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie8 
	 * @name Rose.browser.ie8
	 * @return {Boolean} true/false
	 */
	ie8: /msie 8/.test(navigator.userAgent.toLowerCase()),
	/**
	 * ie9 
	 * @name Rose.browser.ie9
	 * @return {Boolean} true/false
	 */
	ie9: /msie 9/.test(navigator.userAgent.toLowerCase()),
	/**
	 * firefox 
	 * @name Rose.browser.firefox
	 * @return {Boolean} true/false
	 */
	firefox: /firefox\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase()),
	/**
	 * chrome 
	 * @name Rose.browser.chrome
	 * @return {Boolean} true/false
	 */
	chrome: /chrome\/(\d+\.\d+)/i.test(navigator.userAgent.toLowerCase()),
	/**
	 * opera 
	 * @name Rose.browser.opera
	 * @return {Boolean} true/false
	 */	
	opera: /opera/.test(navigator.userAgent.toLowerCase()),
	//safari: /safari/.test(navigator.userAgent.toLowerCase()),
	/**
	 * webkit 
	 * @name Rose.browser.webkit
	 * @return {Boolean} true/false
	 */
	webkit: /webkit/.test(navigator.userAgent.toLowerCase()),
	/**
	 * 获取URL地址栏参数值
	 * 
	 * @method getParameter
	 * @param {String} name 参数名
	 * @param {String} url [optional,default=当前URL]URL地址
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
     * @param {String} uri 要映射的 uri
     * @return {Object} 按照 uri 映射成的对象
     * 
     * @example
     *  var queryObj = Rose.browser.mapQuery("http://www.10086.com/?bb=4765078&style=blue");
     *  // queryObj 则得到一个{bb:"4765078", style:"blue"}的对象。
     * 
     */
    mapQuery :function(uri){
        var i,
            key,
            value,
            uri = uri && uri.split('#')[0] || window.location.search, //remove hash
            index = uri.indexOf("?"),
            pieces = uri.substring(index + 1).split("&"),
            params = {};
        if(index === -1){//如果连?号都没有,直接返回,不再进行处理.
            return params;
        }
        for(i=0; i<pieces.length; i++){
            try{
                index = pieces[i].indexOf("=");
                key = pieces[i].substring(0,index);
                value = pieces[i].substring(index+1);
                if(!(params[key] = unescape(value))){
                    throw new Error("uri has wrong query string when run mapQuery.");
                }
            }
             catch(e){
             //Rose.log("错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
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
	 * @param {String} url 设置的URL
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

