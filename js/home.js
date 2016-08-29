;
/**
 * [description]
 * ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 *
 * @Author                   ------>                                                         xianfei
 * @Title★★★★★★★
 * @DateTime------>                                            2016-08-29T11:36:59+0800
 * @description [saleonline  main js]
 *
 * ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 * @param           {[type]} require                           [description]
 * @param           {[type]} exports                           [description]
 * @param           {Object} module)                           {	var                   home [description]
 * @param           {[type]} _init_sale_login:function(){		} [description]
 * @param           {[type]} };	module.exports                [description]
 * @return          {[type]}                                   [description]
 */
define(function(require, exports, module) {

	var home = {
		init: function() {
			/**
			 * 加载页面开始
			 */
			load = new AILoad({
				callback: function() {},
				model: true
			});
			load.setContent("加载中...");
			load.start();
			//初始化HandleBar是帮助类
			initHandlebarsHelpers();
			//初始化页面
			this._init_sale_login();
		},
		//初始页面加载
		_init_sale_login: function() {

			Rose.ajax.getHtml("tpl/step0.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					$("#STEP_0").html(template());
					load.done();
					$("#STEP_0").show();
					/**
					 * 登录三种情况： a.直接输入用户名、密码成功登录 b.进入注册账号页面 c.忘记密码去重置密码
					 */
					//a.直接输入用户名、密码成功登录
					$("#login").unbind("click").bind("click", function() {
						//xx  输入校验	
					});
					//b.进入注册账号页面
					$("#registerBtn").unbind("click").bind("click", function() {
						 $("#STEP_0").hide();
						load.start();
						home._login_register_page();
					});
					//c.忘记密码去重置密码
					$("#resetPwd").unbind("click").bind("click", function() {
						home._login_resetPwd_page();
					});

				};
			});

		},
		//注册页面逻辑
		_login_register_page: function() {
			Rose.ajax.getHtml("tpl/step1.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					$("#STEP_1").html(template());
					load.done();
					$("#STEP_1").show();
				};
			});
			
		},

	};
	module.exports = home;
});


/**
 * [initHandlebarsHelpers description]
 * ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 *
 * @Author                   ------>                                 xianfei
 * @Title★★★★★★★
 * @DateTime------>                        2016-08-29T13:57:06+0800
 * @description
 *
 * ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 * @return          {[type]} [handerbars 模板加载]
 */
var  initHandlebarsHelpers = function(){

	/**
	 * 页面公共模板加载
	 */
	Handlebars.registerHelper('getHomeTitle', function(data, fn) {
		// <img src="img/icon/green-line.png" class="section2-line "><p class="title-one ">产品优势</p><p class="title-two ">PRODUCT ADVANTAGE</p>
		//var info = getTitleInfo(Number(data));
		var str = '<img src="img/register/top.png" id="t1img1"><span>账户注册</span>';
		return new Handlebars.SafeString(str);
	});
}

