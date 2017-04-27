var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Index = require('../app/controllers/index');
var Comment = require('../app/controllers/comment')


module.exports = function(app) {
	//user
	app.use(function(x,y,next){
		var _user=x.session.user;
		app.locals.user=_user;
		next();
	});
	
	// Index
  	app.get('/', Index.index);
  	
  	//signup
  	app.post('/user/signup', User.signup);
  	app.post('/user/signin', User.signin);
  	app.get('/logout',User.logout);
  	app.get('/admin/user/userlist',User.userlist);
	
	//Movie
	app.get('/movie/:id', Movie.detail);
	app.get('/admin/movie/new',Movie.admin);
	app.get('/admin/movie/update/:id',Movie.update);
	app.post('/admin/movie',Movie.save);
	app.get('/admin/movie/list',Movie.list);
	app.delete('/admin/movie/list',Movie.del);
	
	 // Comment
  	app.post('/user/comment', User.signinRequired, Comment.save)

}