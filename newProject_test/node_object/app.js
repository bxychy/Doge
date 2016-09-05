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
		title:'biu~ 首页'
	});
});

// datile page
app.get('/movie/:id',function(x,y){
	y.render('datile',{
		title:'biu~ 详情页'
	});
});

// admin page
app.get('/admin/movie',function(x,y){
	y.render('admin',{
		title:'biu~ 后台'
	});
});

// list page
app.get('/admin/list',function(x,y){
	y.render('list',{
		title:'biu~ 列表页'
	});
});

