Template.dropzone.events({
    'dropped #dropzone': function(e){
        console.log('droppped a file');
        FS.Utility.eachFile(e, function(file){
            var newFile = new FS.File(file);
            newFile.description = "";
            newFile.title = "";
            newFile.story = "";
            newFile.rank =1;
            if(Session.get('currentcategory')!='all')
             {
                newFile.category=Session.get('currentcategory');
             }
            var imageId = Images.insert(newFile, function(err, fileObj){
                if(err){
                    toastr.error('upload failed ... please check the image uploaded or try again.');
                }else{
                    toastr.success('upload succeeded');
                }
                Session.set('imageId',this._id);
            });
        });
    }
});

