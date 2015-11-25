Meteor.publish('images', function(limit){
    //check(limit, Number);
    return Images.find({ category: "1990" }, {
        limit: limit
    });   
});

Meteor.publish('images-2', function (limit) {
    //check(limit, Number);
    return Images.find({ category: "1991" }, {
        limit: limit
    });
});

Meteor.publish('images-3', function (limit) {
    //check(limit, Number);
    return Images.find({}, {
        limit: limit
    });
});


   
