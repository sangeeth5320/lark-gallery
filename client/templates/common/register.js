// JavaScript source code

Template.register.events({
    "submit .form-signup": function (event) {

        var email = event.target.email.value;
        var password = event.target.password.value;

        Accounts.createUser({
            email: email,
            password: password,
        },function(err){
            if(err)
            { 
                console.log("err");
            }
            else {
                   console.log("success");
                   Router.go('/');
                 }
        });
        return false;
      
    }
});

// Validation rules

