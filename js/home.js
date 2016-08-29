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
					home._business_for_step1();
				};
			});

		},
		//step1 页面的逻辑
		_business_for_step1: function() {
			//xxxxx codeLen   后端可以根据自己需要配置  code的长度
			//校验码的长度  当用户输入长度达到6 的时候可点击下一步
			//后期需要优化 ？？ 用户号码的校验和提醒  还有code  是否正确提醒
			var codeLen = 6;
			$("#reg_phone").blur(function() {
				home._judge_can_goto_step2(codeLen);
			});
			$("#reg_code").unbind("input propertychange").bind("input propertychange", function() {
				home._judge_can_goto_step2(codeLen);
			});
		},
		//step1 中绑定事件 判断是否可以进入到下一步 手机验证
		_judge_can_goto_step2: function(codeLen) {
			var condition1 = $("#reg_code").val().length == 6;
			var condition2 = checkPhone($("#reg_phone").val().trim());
			if (condition1 && condition2) {
				$("#next1").addClass('active').unbind("click").bind("click", function() {
					//xxxxx 后端需要带服务  判断输入的手机号码  或者 code  是否正确
					var can_goto_step2 = submit_step1_data();

					function submit_step1_data() {
						//xxxx  需要后台处理号码 发送短信码验证
						/**
						 * a,提示手机号码错误
						 * b，提示code输入错误
						 */
						$('body').AITips({
							'type': 'toast',
							'message': "请输入正确的验证码[演示效果文案自己改下]",
							'timeout': 2000,
						});
						return true;
					}
					if (can_goto_step2) 
						home._login_step2();
				});
			}else{
				$("#next1").removeClass('active').unbind("click");
			}
		},
		// step2 页面加载
		_login_step2:function(){
				$("#STEP_1").hide();
				load.start();
				Rose.ajax.getHtml("tpl/step2.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					$("#STEP_2").html(template());
					load.done();
					$("#STEP_2").show();
					home._business_for_step2();
				};
			});
		},
		// step2  页面逻辑动画加载
		_business_for_step2:function(){
			  //xxx 
			  //
			  //倒计时方法  时间要改 
			  var timeout = 5;
			  countDowmTimeLoad(timeout);
			  //手机验证码的长度
			  var phoneCodeLen = 6;
			  home._judge_can_goto_step2(phoneCodeLen);	
		},
		// 判断是否可以进入到下一步 输入密码
		_judge_can_goto_step2:function(len){
			$("#phonecode").unbind("input propertychange").bind("input propertychange", function() {
				   if ($(this).val().length==len) {
				   		$("#next2").addClass('active').unbind("click").bind("click",function(){
				   				//xxxx  后端数据对比  判断是否能进入下一步  报错提醒可以用组件
				   				
				   		});
				   }				
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
var initHandlebarsHelpers = function() {

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


/**common  js  method*/
/*判断输入是否为合法的手机号码*/
function checkPhone(inputString) {
	var partten = /^1[3,5,8]\d{9}$/;
	var fl = false;
	if (partten.test(inputString)) {
		return true;
	} else {
		return false;
	}
}
/**倒计时方法*/
function countDowmTimeLoad(time){
	
	var time = Number(time);

	var timer = window.setInterval(function(){
				if (time>0) {
					time--;
					var str = time+"s";
		 			$("#countdownTime").text(str);
				}else{
					clearInterval(timer);
					$("#countdownTime").text("重新发送").addClass('resetTime').unbind("click").bind("click",function(){
						   //xxxxx  重新发送phonecode 
						   $(this).unbind("click").removeClass('resetTime');
						   countDowmTimeLoad(120);
					});
				}
   },1000);
}

/**弹出框公共方法*/
function  toast(timeout,msg){

}