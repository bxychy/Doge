var http=require('http');
var querystring=require('querystring');

var postData=querystring.stringify({
	'content':'一起期待下一次的课程',
	'cid':348
});

var options={
	hostname:'www.imooc.com',
	port:'80',
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=a3715caf-9b02-4898-a36a-ddfba0878e06; imooc_isnew_ct=1468512951; loginstate=1; apsid=E4MDA4OWU3MDhmN2E0ZDQ5ODg5NGE1M2ZjNWM3YmMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTMxOTIxNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5ODQyNDkyMTRAcXEuY29tAAAAAAAAAAAAAAAAAAAAADRlMWU1NjVkYjI0ZmRkNWM2YWE2YjM4OTU1NDViYWYw2SiOV9kojlc%3DOD; last_login_username=984249214%40qq.com; PHPSESSID=ammgc5bgd181tjdrqteji4cqh2; IMCDNS=0; imooc_isnew=2; cvde=57a5b9d6e3000-5',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/348',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req=http.request(options,function(res){
	console.log('headers '+res.statusCode,'status '+JSON.stringify(res.headers));
	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});
	res.on('end',function(){
		console.log('评论结束');
	});
});
req.on('error',function(e){
	console.log('error'+e.message);
});
req.write(postData);
req.end();