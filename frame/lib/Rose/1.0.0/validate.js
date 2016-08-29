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
	regexp:{
        intege:"^-?[1-9]\\d*$",					//整数
        intege1:"^[1-9]\\d*$",					//正整数
        intege2:"^-[1-9]\\d*$",					//负整数
        num:"^([+-]?)\\d*\\.?\\d+$",			//数字
        num1:"^[1-9]\\d*|0$",					//正数（正整数 + 0）
        num2:"^-[1-9]\\d*|0$",					//负数（负整数 + 0）
        decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
        decmal1:/^[0-9]*.?\d*$/,                //正浮点数
        decmal2:"^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
        decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",  //浮点数
        decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
        decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）	
        email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, //邮件
        color:"^[a-fA-F0-9]{6}$",				//颜色
        url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
        chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
        ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
        zipcode:"^\\d{6}$",						//邮编
        mobile:/^(13[0-9]|15[0-9]|14[7|5]|18[0-9])\d{8}$/,				//手机
        ip4:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
        picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
        rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
        date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
        qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
        tel:"^(([0\\+]\\d{2,3}(-)?)?(0\\d{2,3})(-)?)?(\\d{7,8})(-(\\d{3,}))?$",	//电话号码的函数(包括验证国内区号,国际区号,分机号)
        name:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]([\\s.]?[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]+){1,}$", //真实姓名由汉字、英文字母、空格和点组成，不能以空格开头至少两个字
        addressname:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]{1,}$",	//收货人
        username:"^[0-9a-zA-Z_\u0391-\uFFE5]{3,15}$",					//用来用户注册。匹配由数字、26个英文字母中文或者下划线组成的字符串 3-15个字符串之间 
        letter:"^[A-Za-z]+$",					//字母
        letter_u:"^[A-Z]+$",					//大写字母
        letter_l:"^[a-z]+$",					//小写字母
        idcard:"^[1-9]([0-9]{14}|[0-9]{16}[0-9xX])$",	//身份证
        passwrd:"^[\\w-@#$%^&*]{6,20}$",         //密码保证6-20位的英文字母/数字/下划线/减号和@#$%^&*这些符号
        notempty:function(value){
            return value.length > 0;
        }
    },
    /**
     * 格式校验方法
     *
     * @method Check
     * @param {String} type 验证类型
     * @param {String} value 验证值
     */
    Check: function(type,value){
    	var _reg = this.regexp[type];
        if(_reg == undefined){
            alert("Type " + type + " is not in the data");
            return false;
        }
        var reg;
        if(typeof _reg == "string"){
            reg = new RegExp(_reg);
        }
        else if((typeof _reg) == "function"){
            return _reg(value);
        }
        else{
            reg = _reg[type];
        }
        return reg.test(value);
    }
}