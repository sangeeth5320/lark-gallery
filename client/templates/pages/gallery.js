var defaultLimit = 10;
Template.gallery.created = function(){
    var self = this;
    self.limit = new ReactiveVar();
    self.limit.set(defaultLimit);
    Tracker.autorun(function () {
        Meteor.subscribe('images'), self.limit.get()
    });
    // category reactive variable
    self.currentcategory = new ReactiveVar;

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
    'getCurrentCategory': 
        function() {
        return Template.instance().currentcategory.get();
      },

'category': function(){
    var allImages = Images.find().fetch();
    var categoryList = _.uniq(allImages, false, function(d) {return d.category});
    var a = _.pluck(categoryList, "category");
    return a;
},   
// To return all the images
     'images': function (currentcategory) {
         if(!currentcategory){
            return Images.find().fetch();
         }
         return Images.find({ category: currentcategory });
     },
    'username': function () {
        return Session.get('username');
    }
});


Template.gallery.events({
    'click .cbp-filter-item': function(e, template){
        var selectedCategory = $(e.target).attr('data-filter');
        template.currentcategory.set(selectedCategory);
        console.log(template.currentcategory.get());
    }
});