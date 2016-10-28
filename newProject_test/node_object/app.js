var express=require('express');
var path=require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var _ = require('underscore');
var bodyParser = require('body-parser');
var port=process.env.PORT || 3333;
var app=express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');


app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'bower_components')));//静态文件配置的目录
app.set('views','./views/page');
app.set('view engine','pug');
app.listen(port);

console.log('imooc start on port'+port);

// index page
app.get('/',function(x,y){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		y.render('index',{
			title:'biu~ 首页',
			movies: movies
		});
	});
//	y.render('index',{
//		title:'biu~ 首页',
//		movies:[{
//			title:'机器管家',
//			_id:1,
//			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//		},
//		{
//			title: '机械战警',
//			_id: 2,
//			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//		},
//		{
//			title: '机械战警',
//			_id: 3,
//			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//		},
//		{
//			title: '机械战警',
//			_id: 4,
//			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//		},
//		{
//			title: '机械战警',
//			_id: 5,
//			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//		},
//		{
//			title: '机械战警',
//			_id: 6,
//			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//		}]
//	});
});

// datile page
app.get('/movie/:id',function(x,y){
	var id = x.params.id;
	Movie.findById(id,function(err,movie){
		if(err){
            console.log(err);
        }
		y.render('datile',{
			title:'biu~ 详情页',
			movie:movie
		});
	});
//	y.render('datile',{
//		title:'biu~ 详情页',
//		movie:{
//			doctor:'bbb',
//			country:'china',
//			title:'机器人',
//			year:'2222',
//			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
//			language:'中文',
//			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
//			summary:'mdzzyaoshangtian'
//		}
//	});
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

//admin post movie
app.post('/admin/movie/new',function(x,y){
	var id = x.body.movie._id;
    var movieObj = x.body.movie;
    var _movie ;
	if(id!=='undefined'){
		Movie.findById(id,function(err,movie){
			if (err) {
                console.log(err);
            }
			_movie=_.extend(movie,movieObj);
			_movie=save(function(err,movie){
				if (err) {
                	console.log(err);
            	}
				y.redirect('/movie/' + movie._id);
			});
		});
	}else{
		_movie=new Movie({
			doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
		});
		_movie=save(function(err,movie){
			if(err){
                console.log(err);
            }
			y.redirect('/movie/' + movie._id);
		});
	}
});

//admin update movie
app.get('/admin/update/:id',function (x, y) {
	var id= x.params.id;
    if (id) {
        Movie.findById(id, function (err,movie) {
            y.render('admin',{
                title:'biubiubiu~ 后台更新页',
                movie:movie
            })

        })
    }
});

// list page
app.get('/admin/list',function(x,y){
	Movie.fetch(function (err, movies) {
        if(err){
            console.log(err);
        }
        y.render('list',{
            title:'imooc 列表页',
            movies: movies
        });
    });
//	y.render('list',{
//		title:'biu~ 列表页',
//		movies:[{
//			title:'biubiubiu~',
//			_id:1,
//			doctor:'MDZZ',
//			country:'中国',
//			year:'2222',
//			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
//			language:'中文',
//			flash:'http://player.youku.com/player.php/sid/XNjA1Nc0NTU/v.swf',
//			summary:'翻拍自biliangbiliangbiliang的biubiubiu',
//		}]
//	});
});

