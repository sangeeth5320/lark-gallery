var defaultLimit = 10;
Template.gallery.created = function(){
    var self = this;

    self.limit = new ReactiveVar();
    self.limit.set(defaultLimit);

    Tracker.autorun(function () {
        Meteor.subscribe('images'), self.limit.get()
    });

    Tracker.autorun(function () {
        Meteor.subscribe('images-2'), self.limit.get()
    });
    Tracker.autorun(function () {
        Meteor.subscribe('images-3'), self.limit.get()
    });

}

Template.gallery.rendered = function(){
    var self = this;
    $(window).scroll(function(){
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
            incrementLimit(self);
        }
    });
    
}

var incrementLimit = function(templateInstance){
    var newLimit = templateInstance.limit.get() + defaultLimit;
}

Template.gallery.helpers({
    'images': function(){
        return Images.find();
    },
    'images-2': function () {
        return Images.find();
    },
    'images-3': function () {
        return Images.find();
    },
    'username': function () {
        return Session.get('username');
    }

});


Template.gallery.rendered = function () {
    console.log(Session.get('imageId'));
    
}