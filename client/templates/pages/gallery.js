var defaultLimit = 10;
Template.gallery.created = function(){
    var allImages = Images.find().fetch();
    var categoryList = _.uniq(allImages, false, function(d) {return d.category});
    var allCategories = _.pluck(categoryList, "category");
    var self = this;
    self.limit = new ReactiveVar();
    self.limit.set(defaultLimit);
    Tracker.autorun(function () {
        Meteor.subscribe('images'), self.limit.get()
    });
    // category reactive variable
    this.currentcategory = new ReactiveVar;

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
    'filterCategory':function(categoryname){
        var allImages = Images.find().fetch();
        var categoryList = _.uniq(allImages, false, function (d) { return d.category });
        var a = _.pluck(categoryList, "category");

        var output={};
        output=a[0];
        return output;
    },
    'allcategorieslinks':function(){
        var htmlstr='';
        for(var i=0;i<allCategories.length;i++){
  // not working ...
          htmlstr+='<a data-toggle="collapse" id="'allCategories[i]'" data-target="#category'+i+1+'" on-click=callfilter(allCategories[i]) data-catname="'+allCategories[i]+'">allCategories[i]</a> |'
        }
        return htmlstr;
    },

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
         console.log(a);
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
    'click data-catname': function (e, template) {
        var catname= $(template).data('catname');
        var output;
        for(i=0;i<allCategories.length;i++){
            if(allCategories[i]=== catname){
                output=allCategories[i];
            }
        }

        return output;

        var allImages = Images.find().fetch();
        var categoryList = _.uniq(allImages, false, function (d) { return d.category });
        var a = _.pluck(categoryList, "category");
        
        for (var i = 0; a[i]; i++) {
            Session.set("ExampleObject", { "category[i]": a[i] });

            console.log(Session.get("ExampleObject"));
        }
    }
});