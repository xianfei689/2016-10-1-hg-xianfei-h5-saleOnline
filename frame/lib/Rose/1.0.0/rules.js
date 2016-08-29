/**
 * 脚本规则校验配置
 * @namespace Rose
 * @class msg
 */
Rose.rule = {
    /**
     * 对象路径
     * 
     * @method toString
     * @return {String} 'Rose.rule'
     */
    toString : function() {
        return 'Rose.rule';
    },
    /**
     * js脚本路径
     * @type {Object}
     * @property fileMap
     */
    fileMap:{},
    /**
     * 已加载脚本数量 onload
     * 
     * @method toString
     * @return {Number} 
     */
    onloadSize:0,
    /**
     * 远程载入脚本js
     * 
     * @method use
     * @param {Object} rules 验证数据
     */
    use : function(rules) {
        var thizMap = this.fileMap, thizLoad = this.onloadSize;
        for (var i = 0; i < rules.length; i++) {
            var path = rules[i].FILE_NAME;
            if (!thizMap[path]) {
                var head = document.getElementsByTagName('head')[0];
                var node = document.createElement('script');
                node.type = 'text/javascript';
                node.async = 'true';
                node.src = path;
                node.onload = function () {
                   checkAllFiles();
                };
                head.appendChild(node);
                thizMap[path] = true;
            }
        }
        function checkAllFiles() {
            var allLoaded = true;
            for (var i = 0; i < rules.length; i++) {
                if (!thizMap[rules[i].FILE_NAME]) {
                    allLoaded = false;
                    break;
                }
            }
            if(allLoaded){
                thizLoad++;
                Rose.log("已经执行"+thizLoad+"脚本！");
                if(rules.length==thizLoad){
                    Rose.rule.bindFun(rules);      
                }
            }
        }


    },
    /**
     * 绑定校验的DOM,事件和参数
     * 
     * @method bindFun
     * @param {Object} rules 验证数据
     */
    bindFun : function(rules) {
        for(var i = 0; i < rules.length; i++){
            var ruleMap = rules[i], _type = ruleMap.RULE_TYPE, _obj = ruleMap.OBJ_ID, _fun = eval(ruleMap.FUNC), _event= ruleMap.TEVENT;
            var _paramArr = ruleMap.PARAMS, newMap = {};
            for(var p = 0; p < _paramArr.length; p++){
                var pMap = _paramArr[p];
                var _value =  pMap.VALUE;
                if(pMap.TYPE==0){
                    _value = eval(pMap.VALUE);   
                }
                newMap[pMap.NAME] = _value;
            }
            newMap.RULE_ID = ruleMap.RULE_ID;
            newMap.JRULE_ID = ruleMap.JRULE_ID; 
            newMap.RULESET_ID = ruleMap.RULESET_ID;

             $(_obj).bind(_event, newMap, _type==1 ? _fun : function(){
                  Rose.ajax.postJson('',newMap,function(){
                  })    
             });
        }
    },
    
    /**
      *@param  rules         是规则集json，
      *@param  objId        规则配置的 objId
      *@param  callback     验证成功的处理函数
      */
    useRule : function(rules,objId,callback){
    	 var thizMap = this.fileMap, thizLoad = this.onloadSize;
         for (var i = 0; i < rules.length; i++) {
             var path = rules[i].FILE_NAME;
             path = $.trim(path);
             if(path!="" || path == undefined){
            	   if (!thizMap[path]) {
                       var head = document.getElementsByTagName('head')[0];
                       var node = document.createElement('script');
                       node.type = 'text/javascript';
                       node.async = 'true';
                       node.src = path;
                       node.onload = function () {
                          checkAllFiles();
                       };
                       head.appendChild(node);
                       thizMap[path] = true;
                   } 
             }else{
            	 Rose.rule.bindFunRule(rules,objId,callback);
             }    
         }
         function checkAllFiles() {
             var allLoaded = true;
             for (var i = 0; i < rules.length; i++) {
                 if (!thizMap[rules[i].FILE_NAME]) {
                     allLoaded = false;
                     break;
                 }
             }
             if(allLoaded){
                 thizLoad++;
                 Rose.log("已经执行"+thizLoad+"脚本！");
                 if(rules.length==thizLoad){
                     Rose.rule.bindFunRule(rules,objId,callback);
                 }
             }
         }
    },
    
    bindFunRule : function(rules,objId,callback) {
    	var index = -1;
    	 for(var i = 0; i < rules.length; i++){
    		 var _obj = rules[i].OBJ_ID;
    		 if($.trim(objId) == $.trim(_obj)){
    			 index = i;
    		 }
    	 }
    	 if(index!=-1){
    		 var ruleMap = rules[index], _type = ruleMap.RULE_TYPE, _obj = ruleMap.OBJ_ID, _fun = eval(ruleMap.FUNC), _event= ruleMap.TEVENT;
             var _paramArr = ruleMap.PARAMS, newMap = {};
             for(var p = 0; p < _paramArr.length; p++){
                 var pMap = _paramArr[p];
                 var _value =  pMap.VALUE;
                 if(pMap.TYPE==0){
                     _value = eval(pMap.VALUE);
                 }
                 newMap[pMap.NAME] = _value;
             }
             newMap.RULE_ID = ruleMap.RULE_ID;
             newMap.JRULE_ID = ruleMap.JRULE_ID; 
             newMap.RULESET_ID = ruleMap.RULESET_ID;
             if(_type==1){
            	 newMap.callback   = callback; 
             }
              $(_obj).bind(_event, newMap, _type==1 ? _fun : function(){
                   Rose.ajax.postJson(window.dataArray.bceValidation,newMap,function(json,status){
                	   if(status){
                		  // "RETURN_CODE": "1",  1=允许,2=警告，3=不允许
          				  //"MSG": "不能办理"
                		   var resultCode = json.bean.RETURN_CODE;
                		   var msg		  = json.bean.MSG;
                		   switch (resultCode) {
                		   	case "1":
                		   		callback();
                		   		break;
                		   	case "2":
                		   		if(window.confirm(msg)){
                		   			callback();
                		   		}else{
                		   			art.dialog.tips('你取消了操作');
                		   		}
                		   		break;
                		   	case "3":
                		   		art.dialog.tips(msg,5);
                		   		return;
                		   		break;
                		   	default:
                		   		callback();
                		   }
                	   }
                   });   
              }); 
    	 }else{
    		 callback();
    	 }
    },
    
    /**
     * @param  templateId  规则配置的模版ID
     * @param  objId       规则配置的 objId
     * @param  callback    验证成功的处理函数
     */
    useRulel: function(templateId,objId,callback){
    	Rose.ajax.getJson(window.dataArray.queryElemsRules,{plId:templateId}, function(json, status) {
    		if (status) {
    			Rose.rule.useRule(json.rules,objId,callback);
    		}
    	});
    }
};