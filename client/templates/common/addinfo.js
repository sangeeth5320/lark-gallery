Template.addInfo.created = function () {
    //var imageId = Session.get('imageId');
}

Template.addInfo.rendered = function(){
   $( "#name" ).focus();
   Meteor.typeahead.inject();
}

Template.addInfo.helpers({
    ownImage: function () {
        return this.userId === Meteor.userId();
    },
    'username': function () {
        return Session.get('username');
    },
    'artDescription': function () {
        var imageId = Session.get('imageId');
        var image = Images.findOne(imageId);
        console.log(image);
        return image&&image.description;
    },
    'title': function () {
        var imageId = Session.get('imageId');
        var image = Images.findOne(imageId);
        return image&&image.title;
    },
    'category': function () {
        var imageId = Session.get('imageId');
        var image = Images.findOne(imageId);
        return image&&image.category;
    },
    'categoryList': function(){
        console.log('inside cateogry list');
        var allImages = Images.find().fetch();
        var categoryList = _.uniq(allImages, false, function(d) {return d.category});
        var a = _.pluck(categoryList, "category");
        return a;
    }
});

Template.addInfo.events({
    'submit .add-image-info': function (event) {
        console.log('addinfo clicked');
        event.preventDefault();
        var imageId = Session.get('imageId');
        
        var a_title = event.target.title.value;
        var a_category = event.target.category.value;
        a_category=$.trim(a_category);
        var a_description = event.target.artdescription.value;
        if (a_title !="") {
            console.log(a_description);
            console.log(imageId);
            Images.update({ _id: imageId }, { $set: { title: a_title, category: a_category, description: a_description } });
            toastr.success('Art information added ... ');
            Modal.hide('addInfo');
            return false;
        }
        else {
            toastr.error('Please fill the necessary fields before submitting');
        }
        
    }
});