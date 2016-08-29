
/**
 * [description]      seaJS 引用JS 配置路径
 * @AuthorHTL                                                xianfei
 * @DateTime  2016-06-23T08:34:33+0800
 */
//var  basepath = "/hg_phone_xianfei_v2.1"; local
// var  basepath = "";
//  conf [1:测试环境; 0 :本地环境]
var conf = 0;
var srcPref = ["/saleOnline-h5-hg-v1.0",""];
var timeStamp = '$1?ver=' + new Date().getTime();
seajs.config({
  'map': [
		[ /^(.*\.(?:css|js))(.*)$/i,  timeStamp ]
  ],
  base: srcPref[conf],
  // 设置路径，方便跨目录调用
  paths: {
    //'phoneUI': '../../../../frame/lib/webui/1.0.0/phone/js'
  },
  // 设置别名，方便调用
  alias:  {
	 'rose': 'frame/lib/Rose/1.0.0/Rose.src'
  }
});