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
	 * @param {Object} obj 主对象
	 * @example  Rose.dom.clickHide($('#test'))
	 */
	clickHide : function(obj) {
		var $this = $(obj);
		var mouseInsideTag = false;
		
		$this.show();

		$this.hover(function(){ 
	        mouseInsideTag=true; 
	    }, function(){ 
	        mouseInsideTag=false; 
	    });

	    $("html,body").mouseup(function(){ 
	        if(!mouseInsideTag) $this.hide();
	    });
	},
	/**
	 * 自动页面滚动至某元素
	 *
	 * @method autoScroll
	 * @param {All} obj 主体
	 * @param {Object} obj 主对象
	 * @param {Number} time 页面滚动至某元素所需时间
	 * @example Rose.dom.autoScroll($('#goTop'),100)
	 */
	autoScroll : function(obj, time) {
		var $this = $(obj);
		if(!time) time = 500;
		var $top = $this.offset().top;
		$('html,body').animate({
			scrollTop:$top
		},time);
	},
	/**
	 * 表单中的默认字符,点击后隐藏这些字符
	 *
	 * @method defaultChars
	 * @param {All} obj 主体
 	 * @example &lt;input type="text" defaultchars="搜索关键字 比如：(Rose come back)"&gt;
	 */
	defaultChars : function(obj) {
		var $this = $(obj);
		if($this.val()) return;
		var $defaultchars = $this.attr('defaultchars');
		$this.val($defaultchars);
		$this.focusin(function(){
			if ($this.val() == $defaultchars) $this.val('');
		}).focusout(function(){
			if ($this.val() == '') $this.val($defaultchars);
		});
	},
	/**
	 * 获取焦点时的样式
	 *
	 * @method focusClass
	 * @param {Object} obj 主对象
	 * @param {String} styleclass 样式名称	
	 * @example Rose.dom.focusClass($('#username'),"highRed");
	 */
	focusClass : function(obj, styleclass) {
		var $this = $(obj);
		$this.focus(function(){
			$this.toggleClass(styleclass); 
		}).blur(function(){
			$this.toggleClass(styleclass);
		});
	},
	/**
	 * 滑至元素和移除元素时的样式切换
	 *
	 * @method hoverClass
	 * @param {Object} obj 主对象
	 * @param {String} styleclass 样式名称
	 */
	hoverClass : function(obj, styleclass) {
	    var $this = $(obj);
	    $this.hover(function() {
	        $(this).toggleClass(styleclass);
	    },
	    function() {
	        $(this).toggleClass(styleclass);
	    });
	},
	/**
	 * 点击给元素添加样式，并移除已有元素的样式，提供多选参数
	 *
	 * @method clickClass
	 * @param {Object} obj 主对象
	 * @param {String} styleclass 样式名称
	 * @param {boolean} mult [optional,default=false] 是否为多选，默认为单选
	 */
	clickClass : function(obj, styleclass, mult){
	    var $this = $(obj);
	    if (mult == undefined){var mult = false;}
	    $this.click(function(){
	        if(!mult){$this.removeClass(styleclass);}
	        $(this).addClass(styleclass);
	    })
	}
}

