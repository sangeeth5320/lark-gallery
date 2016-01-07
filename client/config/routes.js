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

Router.route('logout');

Router.onAfterAction(function() {
    var self = this;
    // always start by resetting scroll to top of the page
    $(window).scrollTop(0);
    // if there is a hash in the URL, handle it
    if (this.params.hash) {
        // now this is important : Deps.afterFlush ensures that iron-router rendering
        // process has finished inserting the current route template into DOM so we
        // can manipulate it via jQuery, if you skip this part the HTML element you
        // want to scroll to might not yet be present in the DOM (this is probably
        // why your code fails in the first place)
        Tracker.afterFlush(function() {

            if (typeof $("#" + self.params.hash).offset() != "undefined"){
                var scrollTop = $("#" + self.params.hash).offset().top;

                $("html,body").animate({
                    scrollTop: scrollTop
                });

            }

        });
    }
});