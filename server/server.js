
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

		Regions.insert({
			region_name: "EU",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Design",
			region_market: 5,
			region_demand: 1,
			region_trend: "Medium",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 5) + 2),
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		});

		Regions.insert({
			region_name: "AF",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Support",
			region_market: 5,
			region_demand: 7,
			region_trend: "Low",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 5) + 2),
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		});

		Regions.insert({
			region_name: "SA",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Design",
			region_market: -2,
			region_demand: 0,
			region_trend: "Negative",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 5) + 2),
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		});

		Regions.insert({
			region_name: "NA",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Technology",
			region_market: -7,
			region_demand: -4,
			region_trend: "Negative",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 5) + 2),
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		});

		Regions.insert({
			region_name: "AS",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Technology",
			region_market: 4,
			region_demand: 0,
			region_trend: "High",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 5) + 2),
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		});

		Regions.insert({
			region_name: "OC",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Support",
			region_market: 2,
			region_demand: 5,
			region_trend: "Low",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 5) + 2),
			region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		});


		var players = {};
      	var regions = {};
      	var connections = {};

      	var total_people = 0;

      	Regions.find().forEach(function (region) {
      		total_people += region.region_people;
      		regions[region.region_name] = {
      			players: players,
      			region_name: region.region_name,
				region_people: region.region_people,
				region_pref: region.region_pref,
				region_market: region.region_market,
				region_demand: region.region_demand,
				region_trend: region.region_trend,
				base_profit_rate: region.base_profit_rate,
				base_price_rate: region.base_price_rate,
				region_price: region.region_price,
      		}
      	});


      	var game_id = Games.insert({
      		game_name: "test",
      		connections: connections,
        	players: players,
        	regions: regions,
        	status: "process",
        	time_period: 0,
       		total_people: total_people,
      	});


      var i = 0;

		//////////////////////////////////////////////////////////////////////////////////////////////////////

      var interval = Meteor.setInterval(function(){

      	var game = Games.findOne({});

      	//console.log(game.getPlayerList()+" # "+game.getPlayersNumber());
        console.log(game.time_period);

        //console.log(Math.floor((Math.random() * 3) - 1)); ###     values: -1/0/1

        if(game.players){
	        for(var player in game.players){
	        	if(game.players[player].regions){
		        	var players_people = 0;
		            for(var region in game.players[player].regions){
		            	if(game.players[player].regions[region].people > 0){
		            		game.players[player].player_balance += game.players[player].regions[region].people * game.regions[region].base_profit_rate; 
			            	game.players[player].regions[region].people -= 1;
			            	players_people += game.players[player].regions[region].people;
			            	game.players[player].regions[region].share = game.players[player].regions[region].people / game.regions[region].region_people * 100;
			            	game.updatePriceProfit(player, region);

		            	}
		        	}
		            game.players[player].player_share = players_people / total_people * 100;
	        	}


	            if(game.players[player].player_share <= 0 || game.players[player].player_share >= 100){
		            Meteor.clearInterval(interval);
		        }
	        }
    	}

    	// if(i == 20 || i ==40){
	  //   	for(var region in game.regions){
			//     game.updateRegionBasePriceRate(region);
			//     game.updateRegionBaseProfitRate(region);
			// }
		// }

    	//if(i == 60){
	    	for(var region in game.regions){
	    		game.updateRegionBasePriceRate(region);
			    game.updateRegionBaseProfitRate(region);
				game.updateRegionDemand(region);
			    game.updateRegionMarket(region);
			    game.updateRegionTrend(region);
			}
			//i = 0;
		//}

		//i++;

    	game.time_period = game.time_period + 1;


        Games.update(game._id, {
          $set:{
            players: game.players,
            regions: game.regions,
            time_period: game.time_period,
          }
        });

      }, 1000);

	});
}