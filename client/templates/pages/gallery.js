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
          htmlstr+='<a data-toggle="collapse" id="' + allCategories[i] + '" data-target="#category'+i+1+'" on-click=callfilter(allCategories[i]) data-catname="'+allCategories[i]+'">allCategories[i]</a> |'
        }
        return htmlstr;
    },

'category': function(){
    var allImages = Images.find().fetch();
    var categoryList = _.uniq(allImages, false, function(d) {return d.category});
    var a = _.pluck(categoryList, "category");
    // var b = _.pluck(_.sortBy(categoryList, "category"));
    return a;
},   
// To return all the images
     'images': function (currentCategory) {
         if(!currentCategory){
            return Images.find().fetch();
         }
         return Images.find({ category: currentCategory });
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
    },
    'click .cbp-filter-item': function(e, template){
        var selectedCategory = $(e.target).attr('data-filter');
        template.currentcategory.set(selectedCategory);
        console.log(template.currentcategory.get());
    }
});