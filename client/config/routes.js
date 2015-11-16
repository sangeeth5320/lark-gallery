Router.configure({
	layoutTemplate: 'defaultLayout'
});

Router.route('/', function(){
	this.render('home');
},{
	name: 'home'
});

Router.route('gallery');

Router.route('register'); // Page For Registering users - Devois Team 

Router.route('login'); // Page for Client - Larisa ,.
