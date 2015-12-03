NBA = new Meteor.Collection("listNba");
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
    Meteor.publish("allNbas", function () {
        return NBA.find();
    });
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
    Meteor.subscribe("allNbas");

     Template.registerHelper('listNba',function(){
        
            return NBA.find().fetch().map(function(it){return it.title})
      });
     
}

Images.allow({
    insert: function() {return true;},
    update: function() {return true;},
    download: function() {return true;}
})