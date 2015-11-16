// JavaScript source code


Meteor.startup(function () {
   
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'


    });

    accountsUIBootstrap3.setCustomSignupOptions = function () {
        return {
            referrerId: Session.get('referrerId') // Or whatever
        }
    }

});
