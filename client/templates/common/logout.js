// JavaScript source code


Template.logout.events({
    
    "click .logout": function (event) {
        Meteor.logout(function (err) {
            if (err) {
                toastr.success("Problem in logging out");
                console.log("Problem in logging out");

            }
            else {
                toastr.success("logged out");
                console.log("logged out");
            }
        });
        console.log("logout");
        return false;   
    }
});