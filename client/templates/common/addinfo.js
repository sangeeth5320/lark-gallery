Template.addInfo.helpers({
    ownImage: function () {
        return this.userId === Meteor.userId();
    }
});

Template.addInfo.events({
    'submit .add-image-info': function (event) {
        event.preventDefault();
        
        $('#myModal').on('shown.bs.modal', function () {
            $('#name').focus()
        })

        var imageId = Session.get('imageId');
		var artdescription = event.target.artdescription.value;
		
		console.log(this._id);
		Images.update({ _id: this._id }, { $set: { description: artdescription } }, { $set: { createdAt: new Date() }});

		Modal.hide('addInfo');
		
		toastr.success('Art Description added ... ');
		return false;
		
	}
});