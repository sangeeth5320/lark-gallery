// JavaScript source code


Template.login.events({

    "submit .form-signin": function (event) {
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email, password, function (err) {
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


Template.logout.events({
    "click .logout": function (event) {
        Meteor.logout(email, password, function (err) {
            if (err) {
                toastr.success("Problem in logging out");
                console.log("Problem in logging out");

            }
            else {
                toastr.success("logged out");
                console.log("logged out");
            }
        });
    }
 });



