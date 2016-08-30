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
						gotoMainPage();	
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
					var obj = {
						titile:"账户注册",
						id:"back1"
					};
					$("#STEP_1").html(template(obj));
					load.done();
					$("#STEP_1").show();
					$("#back1").unbind("click").bind("click",function(){
							$("#STEP_1").hide();
							$("#STEP_0").show();
					});

					home._business_for_step1(false);
				};
			});

		},
		//step1 页面的逻辑
		_business_for_step1: function(isRest) {
			//xxxxx codeLen   后端可以根据自己需要配置  code的长度
			//校验码的长度  当用户输入长度达到6 的时候可点击下一步
			//后期需要优化 ？？ 用户号码的校验和提醒  还有code  是否正确提醒
			var codeLen = 6;
			$("#reg_phone").blur(function() {
				home._judge_can_goto_step2(codeLen,isRest);
			});
			$("#reg_code").unbind("input propertychange").bind("input propertychange", function() {
				home._judge_can_goto_step2(codeLen,isRest);
			});
		},
		//step1 中绑定事件 判断是否可以进入到下一步 手机验证
		_judge_can_goto_step2: function(codeLen,isRest) {
			var condition1 = $("#reg_code").val().length == 6;
			var condition2 = checkPhone($("#reg_phone").val().trim());
			/*console.log(condition1+"========"+condition2);*/
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
						toast(500, "请输入正确的验证码[演示效果文案自己改下]");
						return true;
					}
					if (can_goto_step2)
						home._login_step2(isRest);
				});
			} else {
				$("#next1").removeClass('active').unbind("click");
			}
		},
		// step2 页面加载
		_login_step2: function(isRest) {
		//  isRest 判断是否为手机面重置
			$("#STEP_1").hide();
			var reg_phone = $("#reg_phone").val().trim();
			//152 6854 1858
			reg_phone = reg_phone.substr(0, 3) + "****" + reg_phone.substr(7, 4);
			load.start();
			Rose.ajax.getHtml("tpl/step2.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					var obj = {
						titile:"账户注册",
					};
					if (isRest) 
						obj.titile = "手机验证";
					$("#STEP_2").html(template(obj));
					$("#showPhone").text(reg_phone);
					load.done();
					$("#STEP_2").show();
					$("#back2").unbind("click").bind("click",function(){
							$("#STEP_2").hide();
							$("#STEP_1").show();
					});
					home._business_for_step2(isRest);
				};
			});
		},
		// step2  页面逻辑动画加载
		_business_for_step2: function(isRest) {
			//xxx 
			//
			//倒计时方法  时间要改 
			var timeout = 5;
			countDowmTimeLoad(timeout);
			//手机验证码的长度
			var phoneCodeLen = 6;
			home._judge_can_goto_step3(phoneCodeLen,isRest);
		},
		// 判断是否可以进入到下一步 输入密码
		_judge_can_goto_step3: function(len,isRest) {
			$("#phonecode").unbind("input propertychange").bind("input propertychange", function() {
				if ($(this).val().length == len) {
					$("#next2").addClass('active').unbind("click").bind("click", function() {
						//xxxx  后端数据对比  判断是否能进入下一步  报错提醒可以用组件
						//判断逻辑参照上一步
						if (!isRest) {
							home._login_step3();
						}else{

							home._login_step5();
						}
					});
				} else {
					$("#next2").removeClass('active').unbind('click');
				}
			});
		},
		//加载第三步
		_login_step3: function() {
			$("#STEP_2").hide();
			load.start();
			Rose.ajax.getHtml("tpl/step3.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					$("#STEP_3").html(template());
					load.done();
					$("#STEP_3").show();
					$("#back3").unbind("click").bind("click",function(){
							$("#STEP_3").hide();
							$("#STEP_2").show();
					});
					home._business_for_step3();
				};
			});
		},
		_business_for_step3: function() {
			//加载用户协议页面
			home._bind_agreement_page();
			
			$(".s3v3").unbind('click').bind("click",function(){
				  home._judge_can_goto_step4();
			});
			$(".s3input").unbind('input propertychange').bind("input propertychange",function(){
				  home._judge_can_goto_step4();
			});
		},
		_bind_agreement_page: function() {
			$("#agreement").unbind("click").bind("click", function() {
				$("#STEP_3").hide();
				load.start();
				Rose.ajax.getHtml("tpl/step3_1.tpl", function(html, status) {
					if (status) {
						var template = Handlebars.compile(html);
						$("#STEP_3_1").html(template());
						load.done();
						$("#STEP_3_1").show();
						$("#back3_1").unbind("click").bind("click",function(){
							$("#STEP_3_1").hide();
							$("#STEP_3").show();
					    });
					};
				});
			});
		},
		//判断是否满足进入step4 页面的条件
		_judge_can_goto_step4: function(){
			var cond1 = $("#s3check").is(':checked');
			var psd1 = $("#psd").val().trim();
			var psd2 = $("#repsd").val().trim();
			var cond2 = psd1==psd2&&psd1!=""&&psd2!="";
			var flag = cond1&&cond2;
			if (flag) {
				$("#next3").addClass("active").unbind("click").bind("click",function(){
						home._login_step4(false);
				});
			}else{
				$("#next3").removeClass('active').unbind("click");
			}
		},
		//isRest 判断是否为重置密码业务
		_login_step4:function(isRest){
			$("#STEP_3").hide();
			if (isRest) {
				$("#STEP_5").hide();
			}
			load.start();
			Rose.ajax.getHtml("tpl/step4.tpl", function(html, status) {
					if (status) {
						var obj = {
							imgsrc :"img/register/success.png"
						};
						if (isRest) 
							obj.imgsrc ="img/register/modifySuc.png";
						var template = Handlebars.compile(html);
						$("#STEP_4").html(template(obj));
						load.done();
						$("#STEP_4").show();
						var time = 5;
						//倒计时x秒后进入主页
						countDowmTimeGotoMain(time);
						

					    if (isRest) {
					    	 $("#back4").unbind("click").bind("click",function(){
								$("#STEP_4").hide();
								$("#STEP_5").show();
					   		 });
					    }else{
					    	$("#back4").unbind("click").bind("click",function(){
								$("#STEP_4").hide();
								$("#STEP_3").show();
					   		 });
					    }
					};
			});
		},
		//c.忘记密码去重置密码
		_login_resetPwd_page:function(){
			$("#STEP_0").hide();
			load.start();
			Rose.ajax.getHtml("tpl/step1.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					var obj = {
						titile:"手机验证",
						id:"back5"
					};
					$("#STEP_1").html(template(obj));
					load.done();
					$("#STEP_1").show();
					$("#back5").unbind("click").bind("click",function(){
							$("#STEP_1").hide();
							$("#STEP_0").show();
					});
					var isRest = true;
					home._business_for_step1(isRest);
				};
			});
		},
		_login_step5:function(){
			$("#STEP_2").hide();
			load.start();
			Rose.ajax.getHtml("tpl/step5.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					$("#STEP_5").html(template());
					load.done();
					$("#STEP_5").show();
					$("#back8").unbind("click").bind("click",function(){
							$("#STEP_5").hide();
							$("#STEP_2").show();
					});
					home._business_for_step5();
				};
			});	
		},
		_business_for_step5:function(){
				$(".s5input").unbind("input propertychange").bind("input propertychange",function(){
						var psd = $("#psd2").val().trim();
						var psd2 = $("#repsd2").val().trim();
						var cond1 = psd==psd2&&psd!=""&&psd2!="";
						var cond2 =  checkPsd(psd);
						if (cond1&&cond2) {
							$("#next5").addClass('active').unbind("click").bind("click",function(){

								  home._login_step4(true);
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
		var str = '<img src="img/register/top.png" class="t1img"><span>账户注册</span>';
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
/*判断输入是否为合法的密码*/
function checkPsd(psd) {
	///[a-zA-Z0-9]{6,}/
	var partten = /^[a-zA-Z0-9]{6,}$/;
	var fl = false;
	if (partten.test(psd)) {
		return true;
	} else {
		return false;
	}
}

/**倒计时方法*/
function countDowmTimeLoad(time) {

	var time = Number(time);

	var timer = window.setInterval(function() {
		if (time > 1) {
			time--;
			var str = time + "s";
			$("#countdownTime").text(str);
		} else {
			clearInterval(timer);
			$("#countdownTime").text("重新发送").addClass('resetTime').unbind("click").bind("click", function() {
				//xxxxx  重新发送phonecode 
				$(this).unbind("click").removeClass('resetTime');
				countDowmTimeLoad(120);
			});
		}
	}, 1000);
}
/**注册成功跳转*/
function countDowmTimeGotoMain(time){
	$("#gotoweb").unbind("click").bind("click",function(){
		gotoMainPage();
	});
	var time = Number(time);
	var timer = window.setInterval(function() {
		if (time > 1) {
			time--;
			var str = time ;
			$("#s4count").text(str);
		} else {
			clearInterval(timer);
			//xxxx跳转逻辑
			gotoMainPage();
		}
	}, 1000);
}
/**弹出框公共方法*/
function toast(timeout, msg) {
	$('body').AITips({
		'type': 'toast',
		'message': msg,
		'timeout': timeout,
	});
}
/**
 * xxxxxxxx
 *
 * 进入业务主页面
 */
var gotoMainPage = function(){

	//xxxxxxxxx

}