/**
 * Created by Administrator on 2016/9/12.
 */

var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var express = require("express");
var path = require('path');

var session = require('express-session');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user');
var port = process.env.PORT || 3333;
var app = express();

var dbUrl="mongodb://localhost:27017/movies";

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));//静态文件配置的目录
app.use(cookieParser());
app.use(session({
	secret: 'biubiubiu~',
	store: new MongoStore({
	    url: dbUrl,
	    collection: 'sessions',
	}),
	resave:false,
	saveUninitialized:true

}))

app.set('views','./views/page');
app.set('view engine','pug');
app.locals.moment = require('moment')
app.listen(port);

console.log('imooc start:'+ port);

//pre handle user
app.use(function(x,y,next){
	var _user=x.session.user;
	app.locals.user=_user;
	next();
});

//index page
app.get('/',function(x,y){
    Movie.fetch(function (err, movies) {
        if(err){
            console.log(err);
        }

        y.render('index',{
            title:'imooc 首页',
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

//signup
app.post('/user/signup',function(x,y){
	var _user=x.body.user;
	console.log('user',_user);
	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log('err',err);
		}
		if(user){
			console.log('81',user);
			return y.redirect('/');
		}else{
			user=new User(_user);
			user.save(function(err,user){
				if(err){
					console.log('err',err);
				}
				y.redirect('/');
			});
		}
	});
});

//signin
app.post('/user/signin',function(x,y){
	var _user=x.body.user;
	var _name=_user.name;
	var _password=_user.password;
	
	User.findOne({name:_name},function(err,user){
		if(err){
			console.log('err',err);
		}
		if(!user){
			return y.redirect('/');
		}
		user.comparePassword(_password,function(err,paw){
			if(err){
				console.log('err',err);
			}
			if(paw){
				x.session.user = user;
        		return y.redirect('/');
			}else {
		        return y.redirect('/signin');
		    }
		});
	});
});

//logout
app.get('/logout',function(x,y){
	delete x.session.user;
    delete app.locals.user;
	y.redirect('/');
});

//userlist page
app.get('/admin/userlist', function(x, y) {
    User.fetch(function (err, users) {
        if(err){
            console.log(err);
        }
        y.render('userlist',{
            title:'biu~ 用户列表页',
            users: users
        });
    });
});

//detail page
app.get('/movie/:id', function(x, y) {
    var id = x.params.id;
    Movie.findById(id,function (err, movie) {
        if(err){
            console.log(err);
        }
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

        y.render('detail', {
            title: 'imooc ' + movie.title,
            movie: movie
        })
    })
})

//admin page
app.get('/admin/movie', function(x, y) {
    y.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
})

//admin update movie
app.get('/admin/update/:id',function (x, y) {
    var id= x.params.id;

    if (id) {
        Movie.findById(id, function (err,movie) {
            y.render('admin',{
                title:'imooc 后台更新页',
                movie:movie
            })

        })
    }
})

//admin post movie
app.post('/admin/movie/new',function (x, y) {
    var id = x.body.movie._id;
    var movieObj = x.body.movie;
    var _movie ;
    if(id!==undefined && id !== "" && id !== null){
        Movie.findById(id,function (err,movie) {
            if (err) {
                console.log(err);
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function (err,movie) {
                if (err){
                    console.log(err);
                }

                y.redirect('/movie/' + movie._id)
            })
        })
    }else{
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        });

        _movie.save(function (err,movie) {
            if (err){
                console.log(err);
            }

            y.redirect('/movie/' + movie._id)
        })
    }
});

//list page
app.get('/admin/list', function(x, y) {
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

//list delete movie
app.delete('/admin/list',function(x,y){
	var id=x.query.id;
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
	            console.log(err);
	        }else{
	        	y.json({success:1});
	        }
		});
	}
});