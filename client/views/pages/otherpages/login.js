Template.login.onRendered(function () {
	//console.log(Meteor.userId());
	// $('#login').validate({
	// 	rules: {
 //            email: {
 //                required: true,
 //                email: true
 //            },
 //            password: {
 //                required: true,
 //                minlength: 6
 //            }
 //        }
	// });
	// var validator = $("#login").validate({
	// 	submitHandler: function(event){
	// 		var email = event.target.email.value;
	// 		var password = event.target.password.value;
	// 		Meteor.loginWithPassword(
	// 			email,
	// 			password,
	// 			function (error) {
	// 				if (error){
	// 					if(error.reason == "User not found"){
	// 				        validator.showErrors({
	// 				            email: error.reason    
	// 				        });
	// 				    }
	// 				    if(error.reason == "Incorrect password"){
	// 				        validator.showErrors({
	// 				            password: error.reason    
	// 				        });
	// 				    }
	// 				}else{
	// 					var currentRoute = Router.current().route.getName();
	// 					if(currentRoute == "login"){
	// 						Router.go('test_dashboard');
	// 					}
	// 				}
	// 			});
	// 	}
	// });
});





Template.login.events({
	'submit #login': function (event) {
		event.preventDefault();
		var email = event.target.email.value;
		var password = event.target.password.value;


		Meteor.loginWithPassword(
			email,
			password,
			function (error) {
				if (error){
					console.log(error.reason);
				}else{
					Router.go('/')
				}
			});

		// var game = Games.findOne({game_name: "test"});
  //       Meteor.call('addPlayer', game);
  //       Session.set("game", game);
	}
});