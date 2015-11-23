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
    }   
         
        /* Meteor.call('art',data,function (err, result) {
            if (err) {
                console.log(err);
            }
            else
            { 
              console.log("Art description added successfully"); 
            }
          }); */    
});