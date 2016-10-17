var express=require('express');
var path=require('path');
var bodyParser = require('body-parser')
var port=process.env.PORT || 3333;
var app=express();

app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'bower_components')));//静态文件配置的目录
app.set('views','./views/page');
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine','jade');
app.set('view engine','pug');
//app.use(bodyParser.urlencoded());
//app.use(bodyParser.urlencoded({extended:true}))

//app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port);

console.log('imooc start on port'+port);

// index page
app.get('/',function(x,y){
	y.render('index',{
		title:'biu~ 首页',
		movies:[{
			title:'机器管家',
			_id:1,
			poster:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
		},
		{
			title: '机械战警',
			_id: 2,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},
		{
			title: '机械战警',
			_id: 3,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},
		{
			title: '机械战警',
			_id: 4,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},
		{
			title: '机械战警',
			_id: 5,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},
		{
			title: '机械战警',
			_id: 6,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
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
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'中文',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
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
			title:'biubiubiu~',
			_id:1,
			doctor:'MDZZ',
			country:'中国',
			year:'2222',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'中文',
			flash:'http://player.youku.com/player.php/sid/XNjA1Nc0NTU/v.swf',
			summary:'翻拍自biliangbiliangbiliang的biubiubiu',
		}]
	});
});

