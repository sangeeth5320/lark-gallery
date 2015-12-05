if(Meteor.isServer){
    var imageStore = new FS.Store.GridFS("images");
    Images = new FS.Collection("images", {
        stores: [imageStore],
        filter:{
            allow: {
                contentTypes: ['image/*']
            }
        }
    })
}

if (Meteor.isClient) {
    var imageStore = new FS.Store.GridFS("images");
    Images = new FS.Collection("images", {
        stores: [imageStore],
        filter: {
            allow: {
                contentTypes: ['image/*']
            },
            onInvalid: function (message) {
                toastr.error(message);
            }
        }
    })
}

Images.allow({
    insert: function() {return true;},
    update: function() {return true;},
    download: function() {return true;}
})