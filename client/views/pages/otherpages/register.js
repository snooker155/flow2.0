Template.register.onRendered(function () {
    //console.log(Meteor.users.find().fetch());
 //    var validator = $("#register").validate({
	// 	submitHandler: function(event){
	// 		var username = event.target.name.value;
	// 		var password = event.target.password.value;
	// 		var email = event.target.email.value;
	// 		Accounts.createUser({
	// 					username: username,
	// 					password: password,
	// 					email: email,
	// 					profile: {
	// 						name: username
	// 					}
	// 				}, function (error) {
	// 					if(error){
	// 						if(error.reason == "Email already exists."){
	// 					        validator.showErrors({
	// 					            email: "That email already belongs to a registered user."   
	// 					        });
	// 					    }
	// 					}else{
	// 						Router.go('test_dashboard');
	// 					}
	// 				});
	// 	}
	// });
});





Template.register.events({
	'submit #register': function (event) {
		event.preventDefault();
		var username = event.target.name.value;
		var password = event.target.password.value;
		var email = event.target.email.value;
		Accounts.createUser({
					username: username,
					password: password,
					email: email,
					profile: {
						name: username
					}
				}, function (error) {
					if(error){
						console.log(error.reason);
					}else{
						Router.go('/');
					}
				});		
	}
});