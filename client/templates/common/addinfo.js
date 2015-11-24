Template.addInfo.helpers({
    ownImage: function () {
        return this.userId === Meteor.userId();
    },
    'username': function () {
        return Session.get('username');
    }
});

Template.addInfo.events({
    'submit .add-image-info': function (event) {
        var imageId = Session.get('imageId');

        var a_title = event.target.title.value;
        var a_story = event.target.story.value;
        var a_description = event.target.artdescription.value;

        console.log(a_description);
        console.log(imageId);

        Images.update({ _id: imageId }, { $set: { description: a_description , title: a_title , story:a_story }});

        toastr.success('Art information added ... ');
        Modal.hide('addInfo');

        return false;
    }
});