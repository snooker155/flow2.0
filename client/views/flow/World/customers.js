
// $(function() {
	
// 	function foo(obj) {
// 		return "<td ><pre style='width:350px'>" + JSON.stringify(obj, null, 2) + "</pre></td>";
// 	}
	
// 	Communication.addSubscriber("users", function(users) {
// 		// todo: do nothing if not active
// 		var hh = "";
// 		for(var i in users) {
// 			var u = users[i];
// 			hh += "<tr>";
// 			hh += "<td>" + u.id + "</td>";
// 			hh += "<td>" + u.name + "</td>";
// 			hh += foo(u.product);
// 			hh += foo(u.loyalty);
// 			hh += "<td>" + u.selfish + "</td>";
// 			hh += "<td>" + u.threshold + "</td>";
// 			hh += "<td>" + u.friends + "</td>";
// 			hh += "</tr>";
// 		}
		
// 		$("#userstablebody").html(hh);
		
// 	});
// });

// Template.customers.helpers ({
// 	customers: function(){
// 		console.log(user_array.get());
// 		return user_array.get();
// 	}
// });
