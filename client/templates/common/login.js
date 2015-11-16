// JavaScript source code


Template.login.events({

    "submit .form-signin": function (event) {
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                console.log("not authorized");
            }
            else {
                console.log("logged in");
                Router.go('/');
            }
       });
        return false;
    }
});


Template.logout.events({
   
    });


