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
    'click .add-artname': function (e) {
        e.preventDefault();
        
        var data = prompt('Enter art description', this.description);
        console.log(data);
        
        Images.update({ _id: this._id }, { $set: { description: data } });


        /* Meteor.call('art',data,function (err, result) {
            if (err) {
                console.log(err);
            }
            else
            { 
              console.log("Art description added successfully"); 
            }
          }); */    
    }

});