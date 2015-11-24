// JavaScript source code


Template.image.helpers({

    postDate: function (date) {
        return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
    },
    ownImage: function () {
        return this.userId === Meteor.userId();
    },
    artDescription: function () {
        return this.description;
    },
    'username': function () {
        return Session.get('username');
    }
});

Template.image.events({
    'click .delete-image': function (e) {
        e.preventDefault();

        var sure = confirm('Are you sure you want to delete this image?');
        if (sure === true) {
            Images.remove({ _id: this._id }, function (error, result) {
                if (error) {
                    toastr.error("Delete failed... " + error);
                } else {
                    toastr.success('Image deleted!');
                }
            })
        }
    },
    'submit .add-image-info': function (event) {
        event.preventDefault();
        Session.set(imageId, this._id);

        var a_title = event.target.title.value;
        var a_story = event.target.story.value;
        var a_description = event.target.artdescription.value;

        var imageId = Session.get('imageId', this._id);
        console.log(a_description);
        console.log(this._id);

        Images.update({ _id: this._id }, { $set: { description: a_description }, $set: { title: a_title }, $set: { story:a_story }});

        toastr.success('Art information added ... ');
        Modal.hide('addInfo');
        return false;

    }
});