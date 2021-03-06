 var defaultLimit = 2;
Template.gallery.created = function(){
   
    var self = this;
    self.limit = new ReactiveVar();
    self.limit.set(defaultLimit);
    Tracker.autorun(function () {
        Meteor.subscribe('images', self.limit.get());
    });
    // category reactive variable
    self.currentcategory = new ReactiveVar;
    Session.set('currentcategory','all');
    self.currentcategory.set('all');
    $(".loader").fadeOut("slow");
  }

Template.gallery.rendered = function(){
    var self = this;
    console.log(self.limit.curValue);
    $(window).scroll(function(){
      if(document.readyState === "complete")
      {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 500){
            incrementLimit(self);
           // console.log(self.limit.curValue);
        }
      }
    });

    Meteor.typeahead.inject();
    //// Image reordering /////
    if(Session.get('username'))
    {
     this.$('#grid-container').sortable({
        stop: function(e, ui) {
          el = ui.item.get(0)
          before = ui.item.prev().get(0)
          after = ui.item.next().get(0)
          if(!before) {
            newRank = Blaze.getData(after).rank - 1
          } else if(!after) {
            newRank = Blaze.getData(before).rank + 1
          }
          else
            newRank = (Blaze.getData(after).rank +
                       Blaze.getData(before).rank)/2
          Images.update({_id: Blaze.getData(el)._id}, {$set: {rank: newRank}})
        }
       })
     }

     Meteor.call('category', function (err, result){ 
            Session.set('q', result);
         })
}

var incrementLimit = function(templateInstance){
    var newLimit = templateInstance.limit.get() + defaultLimit;
    templateInstance.limit.set(newLimit);
}

Template.gallery.helpers({
    'getCurrentCategory': function() {
        return Template.instance().currentcategory.get();
      },
    'category': function(){
        console.log(Session.get('q'));
        return Session.get('q');
    },   
    'images': function (currentcategory) {
      if(currentcategory == 'all'|| !currentcategory){
        return Images.find({},{sort: {rank: 1}});
     } 
     return Images.find({category:currentcategory},{sort:{rank: 1}});
    },
    'username': function () {
        return Session.get('username');
    }
});


Template.gallery.events({
      'click .cbp-filter-item-others': function(e, template){

           $('.cbp-filter-item').removeClass("cbp-filter-item-active");
           $(e.target).addClass("cbp-filter-item-active");
           $('#al').removeClass("selected"); 
           $(window).scrollTop(0);
           $("html,body").animate({
                    scrollTop: 250
                });     
           $("html,body").animate({
                    scrollBottom: 10
                });     
     },
      'click .cbp-filter-item-all':function(e, template){
           $('.cbp-filter-item').removeClass("cbp-filter-item-active");
           $(e.target).addClass("selected");
     },
      'click .cbp-filter-item': function(e, template){
           var selectedCategory = $(e.target).attr('data-filter');
           template.currentcategory.set(selectedCategory);
           Session.set('currentcategory',selectedCategory);
           console.log(template.currentcategory.get());
     }
});