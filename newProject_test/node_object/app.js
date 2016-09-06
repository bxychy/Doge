var express=require('express');
var port=process.env.PORT || 3333;
var app=express();

app.set('views','./views');
app.set('view engine','jade');
app.listen(port);

console.log('imooc start on port'+port);

// index page
app.get('/',function(x,y){
	y.render('index',{
		title:'biu~ 首页',
		movies[{
			title:'机器管家',
			_id:1,
			poster:'https://www.baidu.com'
		}]
	});
});

// datile page
app.get('/movie/:id',function(x,y){
	y.render('datile',{
		title:'biu~ 详情页',
		movie:{
			doctor:'bbb',
			country:'china',
			title:'机器人',
			year:'2222',
			poster:'http://www.baidu.com',
			language:'中文',
			flash:'http:player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'mdzzyaoshangtian'
		}
	});
});

// admin page
app.get('/admin/movie',function(x,y){
	y.render('admin',{
		title:'biu~ 后台',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			falsh:'',
			summary:'',
			language:''
		}
	});
});

// list page
app.get('/admin/list',function(x,y){
	y.render('list',{
		title:'biu~ 列表页',
		movies:[{
			title
		}]
	});
});

