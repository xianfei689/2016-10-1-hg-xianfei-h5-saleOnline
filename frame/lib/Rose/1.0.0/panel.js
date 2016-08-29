/**
 * 控制面板
 * @namespace Rose
 * @class panel
 */
Rose.panel = {
    /**
     * 对象路径
     * 
     * @method toString
     * @return {String} 'Rose.rule'
     */
    toString : function() {
        return 'Rose.panel';
    },
    open:function(obj) {
        Rose.ajax.loadHtml(obj.attr('container'), obj.attr('source'), cmd, callback);
    }
};