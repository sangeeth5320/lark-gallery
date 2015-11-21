// JavaScript source code

Template.login.events({

    "submit .form-signin": function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;    

        Meteor.call('authorization', email, password, function (err, result) {
            console.log("Client call back : ");
            console.log(err);
            console.log(result);
            if (result) {
                Session.set('username', email);
                var username = Session.get('username');
                Router.go('/');
            }
            else {
                toastr.success("Username or password incorrect");
                event.target.email.value = "";
                event.target.password.value = "";
            }
                
    });       
    }
});

Template.login.helpers({
        
    user: {
        name: 'Sa',
        sleeping: false
    },
    'username': function () {
        return Session.get('username');
    }

 });

Template.login.rendered = function () {

    if (username) {
        Router.go('/');
        }
        else {
            toastr.success("Please log in");
        }
    return false;
}   

// methods 
if (Meteor.isClient) {

    /*  Account Creation 

       Accounts.createUser({        
        email: "sa",
        password: "12345",
    }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Admin Account created");
        }
    });
         */
   
}