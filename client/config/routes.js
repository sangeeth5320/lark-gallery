Router.configure({
	layoutTemplate: 'defaultLayout'
});

Router.route('/', function(){
	this.render('home');
},{
	name: 'home'
});

Router.route('gallery');