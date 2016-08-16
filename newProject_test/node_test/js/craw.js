var http=require('http');
var _url='http://www.baidu.com/';
http.get(_url,function(res){
	var _html='';
	res.on('data',function(data){
		_html+=data;
	});
	res.on('end',function(){
		console.log(_html);
	});
}).on('error',function(){
	console.log('获取百度数据错误');
});
