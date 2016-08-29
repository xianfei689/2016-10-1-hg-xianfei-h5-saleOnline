/**
 * 脚本规则校验配置
 * @namespace Rose
 * @class msg
 */
Rose.down = {
    /**
     * 对象路径
     * 
     * @method toString
     * @return {String} 'Rose.down'
     */
    toString : function() {
        return 'Rose.down';
    },
    /**
     * @method toString
     * @author mayc
     * @param url  导出地址
     * @param params 参数 如：{name:122,age:19}
     * @callback  导出失败处理函数
     */
	downFile:function(url,params,callback){
		var form = '<form action="" id="Rose_downFile" name="downFile" method="post" target="Rose_downFile_hidden_frame"></form>';
		var iframes = '<iframe name="Rose_downFile_hidden_frame" id="Rose_downFile_hidden_frame" style="display:none;visibility: hidden;"></iframe>';
		if($("#Rose_downFile").length>0){
			$("#Rose_downFile").remove();
		}
		if($('#Rose_downFile_hidden_frame').length>0){
			$("#Rose_downFile_hidden_frame").remove();
		}
		$("body").append(form);
		$("body").append(iframes);
		var content = "";
	   for(var key in params){
	       if(params.hasOwnProperty(key)){
	    	   content +='<input type="hidden" name="'+key+'" value="'+params[key]+'" />';
	       }
	   }
	  $("#Rose_downFile").html(content);
	  var iframe = $("#Rose_downFile_hidden_frame");
	  iframe.bind('load',function() {
	    iframe.unbind();
	    var iframeDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
	    var data, str = iframeDoc.body.innerHTML;
	    var resoure = iframeDoc.body.innerHTML;
	    str = str.replace(/<.+?>/g, '');
	    try {
	    	data = $.parseJSON(str);
	    } catch(e) {
	    	//alert("JSON Format Error:" + e.toString());
	    	result_prompt('0','系统异常:导出失败，请联系管理员！',230);
	    	//Rose.log(resoure);
	    	return;
	    }
	    if(callback){
	    	callback(data.data);
	    }else{
	    	if(data.data.code==1){
	    		art.dialog.tips(data.data.msg || "导出文件错误，请联系管理员！");
			 }
	    }
	  });
	  $("#Rose_downFile").attr("action",url);
	  document.getElementById("Rose_downFile").submit();
	}
};