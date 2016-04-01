
if(Meteor.isServer){

	Meteor.startup(function () {


		Meteor.onConnection(function(conn) {
		    conn.onClose(function(){
				Meteor.call('disconnectPlayer', conn);
				console.log('closed');
			});
		    console.log('New connection %s from %s', conn.id, conn.clientAddress);
		    //Meteor.call('addPlayer', Meteor.user().username);
		});

		Games.find().fetch().forEach(function (game) {
			Games.remove(game._id);
		});

		Regions.find().fetch().forEach(function (region) {
			Regions.remove(region._id);
		});

		News.find().fetch().forEach(function (news) {
			News.remove(news._id);
		});

		Departments.find().fetch().forEach(function (department) {
			Departments.remove(department._id);
		});

		Features.find().fetch().forEach(function (feature) {
			Features.remove(feature._id);
		});

		Companies.find().fetch().forEach(function (company) {
			Companies.remove(company._id);
		});

		Customers.find().fetch().forEach(function (customer) {
			Customers.remove(customer._id);
		});



		// News.insert({
		// 	news_type: "check",
		// 	news_theme: "Global Mobile Technology Conference",
		// 	news_message: "People from the industry have forecast a strong increase of mobile messengers.",
		// 	news_demand: 10,
		// 	news_market: 15,
		// 	news_region: "World",
		// 	news_preference: "Technology",
		// });


		News.insert({
			news_type: "newspaper-o",
			news_theme: "Global Mobile Technology Conference",
			news_message: "People from the industry have forecast a strong increase of mobile messengers.",
			news_demand: 10,
			news_market: 15,
			news_region: "World",
			news_preference: "Technology",
		});

		News.insert({
			news_type: "newspaper-o",
			news_theme: "New wave of innovations are coming",
			news_message: "The sceintist from MIT have developed new strong algorythm for predicting future price of stock exchange.",
			news_demand: 5,
			news_market: 2,
			news_region: "World",
			news_preference: "Technology",
		});


		// News.insert({
		// 	news_type: "usd",
		// 	news_theme: "USD test news",
		// 	news_message: "Test news for usd type.",
		// 	news_demand: 2,
		// 	news_market: 10,
		// 	news_region: "World",
		// 	news_preference: "Technology",
		// });

		// News.insert({
		// 	news_type: "user",
		// 	news_theme: "User test news",
		// 	news_message: "Test news for user type.",
		// 	news_demand: 0,
		// 	news_market: -12,
		// 	news_region: "World",
		// 	news_preference: "Technology",
		// });

		// News.insert({
		// 	news_type: "warning",
		// 	news_theme: "Warning test news",
		// 	news_message: "Test news for warning type.",
		// 	news_demand: -7,
		// 	news_market: -3,
		// 	news_region: "World",
		// 	news_preference: "Technology",
		// });



		Departments.insert({
			department_name: "Technology",
			employee_price: 100,
		});


		Departments.insert({
			department_name: "Design",
			employee_price: 150,
		});





		Features.insert({
			feature_name: "Engine",
			time_to_achieve: 15,
			feature_price: 250,
			neccessary_employees_number: 2,
			neccessary_level: 1,
		});

		Features.insert({
			feature_name: "UI",
			time_to_achieve: 25,
			feature_price: 350,
			neccessary_employees_number: 3,
			neccessary_level: 1,
		});

		Features.insert({
			feature_name: "Adaptive",
			time_to_achieve: 35,
			feature_price: 450,
			neccessary_employees_number: 4,
			neccessary_level: 1,
		});





		Regions.insert({
			region_name: "EU",
			region_full_name: "Europe",
			// region_people: 2000 + Math.floor((Math.random() * 500) + 100),
			region_people: 50 + Math.floor((Math.random() * 5) + 2),
			region_pref: "Design",
			region_market: 1.5,
			region_demand: 4,
			region_trend: "Medium",
			base_profit_rate: 0.07,
			base_price_rate: parseFloat(Math.random().toFixed(2)) + 1,
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
			level_of_conservatism: 0.05,
		});

		Regions.insert({
			region_name: "AF",
			region_full_name: "Africa",
			region_people: 50 + Math.floor((Math.random() * 5) + 2),
			region_pref: "Support",
			region_market: 1.5,
			region_demand: 4,
			region_trend: "Low",
			base_profit_rate: 0.07,
			base_price_rate: parseFloat(Math.random().toFixed(2)) + 1,
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
			level_of_conservatism: 0.05,
		});

		Regions.insert({
			region_name: "SA",
			region_full_name: "South America",
			region_people: 50 + Math.floor((Math.random() * 5) + 2),
			region_pref: "Design",
			region_market: 1.5,
			region_demand: 4,
			region_trend: "Negative",
			base_profit_rate: 0.07,
			base_price_rate: parseFloat(Math.random().toFixed(2)) + 1,
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
			level_of_conservatism: 0.05,
		});

		Regions.insert({
			region_name: "NA",
			region_full_name: "North America",
			region_people: 50 + Math.floor((Math.random() * 5) + 2),
			region_pref: "Technology",
			region_market: 1.5,
			region_demand: 4,
			region_trend: "Negative",
			base_profit_rate: 0.07,
			base_price_rate: parseFloat(Math.random().toFixed(2)) + 1,
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
			level_of_conservatism: 0.05,
		});

		Regions.insert({
			region_name: "AS",
			region_full_name: "Asia",
			region_people: 50 + Math.floor((Math.random() * 5) + 2),
			region_pref: "Technology",
			region_market: 1.5,
			region_demand: 4,
			region_trend: "High",
			base_profit_rate: 0.07,
			base_price_rate: parseFloat(Math.random().toFixed(2)) + 1,
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
			level_of_conservatism: 0.05,
		});

		Regions.insert({
			region_name: "OC",
			region_full_name: "Oceania",
			region_people: 50 + Math.floor((Math.random() * 5) + 2),
			region_pref: "Support",
			region_market: 1.5,
			region_demand: 4,
			region_trend: "Low",
			base_profit_rate: 0.07,
			base_price_rate: parseFloat(Math.random().toFixed(2)) + 1,
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
			level_of_conservatism: 0.05,
		});


		var players = {};
      	var regions = {};
      	var connections = {};

      	var total_people = 0;
      	var i = 0;
      	var j = 0;

      	Regions.find().forEach(function (region) {
      		total_people += region.region_people;
      		regions[region.region_name] = {
      			region_id: ++i,
      			players: players,
      			region_name: region.region_name,
      			region_full_name: region.region_full_name,
				region_people: region.region_people,
				region_pref: region.region_pref,
				region_market: region.region_market,
				region_demand: region.region_demand,
				region_trend: region.region_trend,
				base_profit_rate: region.base_profit_rate,
				base_price_rate: region.base_price_rate,
				region_price: region.region_price,
				level_of_conservatism: region.level_of_conservatism,
      		}

      		// if(region.region_name == "EU"){
	      		for (var d = 0; d < region.region_people; d++){
	      			Customers.insert({
						customer_id: ++j,
						customer_region: region.region_name,
						customer_money: 2000 + Math.floor((Math.random() * 500) + 100),
						customer_conservatism: Math.random() / 10,
						customer_period_income: 20 + Math.floor((Math.random() * 5) + 1),
						customer_pref: region.region_pref,
						customer_activity: Math.round(Math.random()),
					});
	      		}
      		// }
      	});


      	var game_id = Games.insert({
      		game_name: "test",
      		connections: connections,
        	players: players,
        	regions: regions,
        	status: "process",
        	time_period: 0,
       		//total_people: total_people,
      	});


      var i = 0;
      // var flag_price = 0;
      // var flag_people = 1;

		//////////////////////////////////////////////////////////////////////////////////////////////////////

      var interval = Meteor.setInterval(function(){


      	console.log('0');

      	Customers.find().fetch().forEach(function (customer) {
      		Customers.update(customer._id, {
      			$set:{
      				customer_money: customer.customer_money + customer.customer_period_income,
      				customer_conservatism: customer.customer_conservatism + 0.00001,
      				customer_activity: Math.round(Math.random()),
      			}
      		});
      	});

  //     	var game = Games.findOne({});

  //     	//console.log(game.getPlayerList()+" # "+game.getPlayersNumber());
  //       console.log(game.time_period);

  //       //console.log(Math.floor((Math.random() * 3) - 1)); ###     values: -1/0/1

  //       if(game.players){
	 //        for(var player in game.players){

	 //        	game.updatePlayerExp(player);

	 //        	for (var region in game.players[player].regions){
	 //        		game.buyShare(region, player);
	 //        	}

	 //        	game.updateMarketShare(player);


	 //            if(game.players[player].player_share <= 0 || game.players[player].player_share >= 100 || game.players[player].player_balance < 0){
		//             Meteor.clearInterval(interval);
		//         }
	 //        }
  //   	}






  // //   	if(i == 20){
	 // //    	for(var region in game.regions){
		// // 	    game.updateRegionBaseProfitRate(region);

		// // 	    game.updateRegionBasePriceRate(region);

		// // 	    game.updateRegionPeople(region);

		// // 		game.updateRegionDemand(region);
		// // 	    game.updateRegionMarket(region);
		// // 	}
		// // 	i = 0;
		// // }

		// // i++;



		// // for(var region in game.regions){
		// // 	game.updateRegionTrend(region);
		// // }



  //   	game.time_period = game.time_period + 1;

  //       Games.update(game._id, {
  //         $set:{
  //           players: game.players,
  //           regions: game.regions,
  //           time_period: game.time_period,
  //         }
  //       });

      }, 1000);

	});
}