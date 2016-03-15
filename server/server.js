
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



		News.insert({
			news_type: "check",
			news_theme: "",
			news_message: "",
			news_demand:
			news: market:
		});

		News.insert({
			news_type: "newspaper"
			news_theme:
			news_message:
			news_demand:
			news: market:
		});

		News.insert({
			news_type: "usd"
			news_theme:
			news_message:
			news_demand:
			news: market:
		});

		News.insert({
			news_type: "newspaper"
			news_theme:
			news_message:
			news_demand:
			news: market:
		});

		News.insert({
			news_type: "warning"
			news_theme:
			news_message:
			news_demand:
			news: market:
		});




		Regions.insert({
			region_name: "EU",
			region_people: 2000 + Math.floor((Math.random() * 500) + 100),
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
			region_people: 2000 + Math.floor((Math.random() * 500) + 100),
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
			region_people: 2000 + Math.floor((Math.random() * 500) + 100),
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
			region_people: 2000 + Math.floor((Math.random() * 500) + 100),
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
			region_people: 2000 + Math.floor((Math.random() * 500) + 100),
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
			region_people: 2000 + Math.floor((Math.random() * 500) + 100),
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
				level_of_conservatism: region.level_of_conservatism,
      		}
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

      	var game = Games.findOne({});

      	//console.log(game.getPlayerList()+" # "+game.getPlayersNumber());
        console.log(game.time_period);

        //console.log(Math.floor((Math.random() * 3) - 1)); ###     values: -1/0/1

        if(game.players){
	        for(var player in game.players){

	        	game.updatePlayerExp(player);

	        	for (var region in game.players[player].regions){
	        		game.buyShare(region, player);
	        	}

	        	game.updateMarketShare(player);


	            if(game.players[player].player_share <= 0 || game.players[player].player_share >= 100 || game.players[player].player_balance < 0){
		            Meteor.clearInterval(interval);
		        }
	        }
    	}




    	if(i == 20){
	    	for(var region in game.regions){
			    game.updateRegionBaseProfitRate(region);

			    game.updateRegionBasePriceRate(region);

			    game.updateRegionPeople(region);

				game.updateRegionDemand(region);
			    game.updateRegionMarket(region);
			}
			i = 0;
		}

		i++;



		for(var region in game.regions){
			game.updateRegionTrend(region);
		}



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