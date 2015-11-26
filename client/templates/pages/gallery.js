var defaultLimit = 10;
Template.gallery.created = function(){
    var self = this;

    self.limit = new ReactiveVar();
    self.limit.set(defaultLimit);

    Tracker.autorun(function () {
        Meteor.subscribe('images'), self.limit.get()
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
     'category': function(){
	    var allImages = Images.find().fetch();
	    var categoryList = _.uniq(allImages, false, function(d) {return d.category});
	    var a = _.pluck(categoryList, "category");
	   // var b = _.pluck(_.sortBy(categoryList, "category"));
	    return a;
     },   // Below Block needs to be optimized 
     'category1': function () {
         var allImages = Images.find().fetch();
         var categoryList = _.uniq(allImages, false, function (d) { return d.category });
         var a = _.pluck(categoryList, "category");
         return a[0];
     },
     'category2': function () {
         var allImages = Images.find().fetch();
         var categoryList = _.uniq(allImages, false, function (d) { return d.category });
         var a = _.pluck(categoryList, "category");
         return a[1];
     },
     'category3': function () {
         var allImages = Images.find().fetch();
         var categoryList = _.uniq(allImages, false, function (d) { return d.category });
         var a = _.pluck(categoryList, "category");
         return a[2];
     },
     'category4': function () {
         var allImages = Images.find().fetch();
         var categoryList = _.uniq(allImages, false, function (d) { return d.category });
         var a = _.pluck(categoryList, "category");
         return a[3];
     },
     'category5': function () {
         var allImages = Images.find().fetch();
         var categoryList = _.uniq(allImages, false, function (d) { return d.category });
         var a = _.pluck(categoryList, "category");
         return a[4];
     },
     'category6': function () {
         var allImages = Images.find().fetch();
         var categoryList = _.uniq(allImages, false, function (d) { return d.category });
         var a = _.pluck(categoryList, "category");
         return a[5];
     },
    // To return all the images
     'images': function (category) {
        var allImages = Images.find().fetch();
        var categoryList = _.uniq(allImages, false, function (d) { return d.category });
        var a = _.pluck(categoryList, "category");
        return Images.find({ category: { $in: category } });
     },
    // To return selected category
     'imagescategory': function (categoryValue) {
         var allImages = Images.find().fetch();
         var categoryList = _.uniq(allImages, false, function (d) { return d.category });
         var a = _.pluck(categoryList, "category");
         return Images.find({ category: categoryValue });
     },
    'username': function () {
        return Session.get('username');
    }
});


Template.gallery.events({
    /* 'click #all': function (e) {
        console.log(e);
    }  */
});