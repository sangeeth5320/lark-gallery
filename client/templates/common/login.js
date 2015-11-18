// JavaScript source code


Template.login.events({

    "submit .form-signin": function (event) {
        var username = event.target.email.value;
        var password = event.target.password.value;
        Meteor.call('authorization', username, password);
        Meteor.loginWithPassword(username, password, function (err) {
            if (err) {
                console.log("not authorized");
                toastr.error('not authorized');
            }
            else {
                toastr.success("logged in");
                console.log("logged in");
                Router.go('/');
            }
       });
    return false;
    }
});
/////////////// 
Meteor.methods({
    authorization: function (username, password) {
        if(username =="s" && password =="12345")
        {
            console.log("Authorized");
        }
    }
    

});
  