Meteor.methods({
    authorization: function (email, password) {
        
        for (var n = 0; Meteor.settings.users; n++) {
            var settings_email = Meteor.settings.users[n].username;
            var settings_password = Meteor.settings.users[n].password;

            if (email == settings_email && password == settings_password) {
                console.log(email);
                console.log(password);
                return true;
            }
            else if (!Meteor.settings.users[n].username) {
                console.log("Authentication problem ");
                return false;
            }           
        }
        return false;
    },
   /* art: function (text) {
         
    }  */
});

