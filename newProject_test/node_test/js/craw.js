var http=require('http');
//var _url='http://www.baidu.com/';
var _url='http://www.imooc.com/learn/348';
http.get(_url,function(res){
//	console.log('res',res);
	var _html='';
	res.on('data',function(data){
//		console.log('data',data);
		_html+=data;
	});
	res.on('end',function(){
//		console.log(_html);
	});
}).on('error',function(){
	console.log('获取百度数据错误');
});
