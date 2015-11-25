var defaultLimit = 10;
Template.gallery.created = function(){
    var self = this;

    self.limit = new ReactiveVar();
    self.limit.set(defaultLimit);

    Tracker.autorun(function () {
        Meteor.subscribe('images'), self.limit.get()
    });
    Tracker.autorun(function () {
        Meteor.subscribe('imagesall'), self.limit.get()
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
    "images1990": function () {
        var years = [];
        var firstYear = 1990;
        var lastYear = 2000;
        for (var i = firstYear; i < lastYear; i++) {
            years.push(String(i));
        }
        return Images.find({ category: {$in:years} });
        // return Images.find({category:"1990"},{category:"1991"});
    },
    "images2000": function () {
        var years = [];
        var firstYear = 2000;
        var lastYear = 2013;
        for (var i = firstYear; i < lastYear; i++) {
            years.push(String(i));
        }
        return Images.find({ category: { $in: years} });
    },
    "images2014": function () {
        return Images.find({ category: "2014" });
    },
    "images2015": function () {
        return Images.find({ category: "2015" });
    },
    'username': function () {
        return Session.get('username');
    }
});


Template.gallery.events({
    'click #all': function (e) {
        console.log("all");
        return Images.find();
    }
});