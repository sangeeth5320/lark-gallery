Template.addInfo.created = function () {
    //var imageId = Session.get('imageId');
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
        return image.description;
    },
    'title': function () {
        var imageId = Session.get('imageId');
        var image = Images.findOne(imageId);
        return image.title;
    },
    'category': function () {
        var imageId = Session.get('imageId');
        var image = Images.findOne(imageId);
        return image.category;
    }  
});

Template.addInfo.events({
    'submit .add-image-info': function (event) {
        console.log('addinfo clicked');
        event.preventDefault();
        var imageId = Session.get('imageId');
        
        var a_title = event.target.title.value;
        var a_category = event.target.category.value;
        var a_description = event.target.artdescription.value;
        if (a_title !="" && a_description !="") {
            console.log(a_description);
            console.log(imageId);
            Images.update({ _id: imageId }, { $set: { title: a_title, category: a_category, description: a_description } });
            toastr.success('Art information added ... ');
            // Inserting data into the the collection 
            NBA.insert({title:a_title });
            NBA.insert({category:a_category});
            NBA.insert({description:a_description});
            Modal.hide('addInfo');
            return false;
        }
        else {
            toastr.error('Please fill all the fields before submitting');
        }
        
    }
});