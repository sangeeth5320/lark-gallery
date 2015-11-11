(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/config/routes.js                                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
	layoutTemplate: 'defaultLayout'                                       // 2
});                                                                    //
                                                                       //
Router.route('/', function () {                                        // 5
	this.render('home');                                                  // 6
}, {                                                                   //
	name: 'home'                                                          // 8
});                                                                    //
                                                                       //
Router.route('gallery');                                               // 11
/////////////////////////////////////////////////////////////////////////

}).call(this);
