Template.dropzone.events({
    'dropped #dropzone': function(e){
        console.log('droppped a file');
        FS.Utility.eachFile(e, function(file){
            var newFile = new FS.File(file);
            newFile.description = "";
            newFile.title = "";
            newFile.story = "";
            if(Images.find().count()==0)  
            {
                Session.set('rank',10000); // set rank to 0 if no images
            }
            newFile.rank =Session.get('rank')-1;
            Session.setPersistent('rank',newFile.rank);
            
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

