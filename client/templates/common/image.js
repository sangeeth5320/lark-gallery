// JavaScript source code


Template.image.helpers({

    postDate: function (date) {
        return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
    },
    ownImage: function () {
        return this.userId === Meteor.userId();
    },
    'artDescription': function () {
        return this.description;
    },
    'username': function () {
        return Session.get('username');
    },
     'title': function () {
         return this.title;
     },
     'category': function () {
         return this.category;
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
    'click #addImageInfo': function(e) {
        e.preventDefault();
        console.log(this._id);
        Session.set('imageId', this._id);

        // Modal.find('.form-group input').val()
        
        Modal.show('addInfo');
        $('#myModal').modal('hide');
    }
});