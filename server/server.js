
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
			region_market: 15,
			region_demand: 10,
			region_trend: "Medium",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 10) + 15),
		});

		Regions.insert({
			region_name: "AF",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Support",
			region_market: 5,
			region_demand: 7,
			region_trend: "Low",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 10) + 15),
		});

		Regions.insert({
			region_name: "SA",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Design",
			region_market: -2,
			region_demand: 0,
			region_trend: "Negative",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 10) + 15),
		});

		Regions.insert({
			region_name: "NA",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Technology",
			region_market: -17,
			region_demand: -24,
			region_trend: "Negative",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 10) + 15),
		});

		Regions.insert({
			region_name: "AS",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Technology",
			region_market: 24,
			region_demand: 30,
			region_trend: "High",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 10) + 15),
		});

		Regions.insert({
			region_name: "OC",
			region_people: 1000 + Math.floor((Math.random() * 500) + 100),
			region_pref: "Support",
			region_market: 2,
			region_demand: 5,
			region_trend: "Low",
			base_profit_rate: Math.floor((Math.random() * 10) + 7),
			base_price_rate: Math.floor((Math.random() * 10) + 15),
		});


		var players = {};
      	var regions = {};

      	var total_people = 0;

      	Regions.find().forEach(function (region) {
      		total_people += region.region_people;
      		regions[region.region_name] = {
      			players: players,
      		}
      	});

      	var game_id = Games.insert({
      		game_name: "test",
        	players: players,
        	regions: regions,
        	status: "process",
        	time_period: 0,
       		total_people: total_people,
      	});



		//////////////////////////////////////////////////////////////////////////////////////////////////////

      	var interval = Meteor.setInterval(function(){

      	var game = Games.findOne({});

        console.log(game.time_period);

        if(game.players){
	        for(var player in game.players){
	        	if(game.players[player].regions){
		        	var players_people = 0;
		            for(var region in game.players[player].regions){
		            	game.players[player].regions[region].people -= 10;
		            	players_people += game.players[player].regions[region].people;
		            	game.players[player].regions[region].share = game.players[player].regions[region].people / Regions.findOne({region_name: region}).region_people * 100;
		            }
		            game.players[player].player_share = players_people / total_people * 100;
	        	}

	            if(game.players[player].player_share <= 0 || game.players[player].player_share >= 100){
		            Meteor.clearInterval(interval);
		        }
	        }
    	}

    	game.time_period = game.time_period + 1;


        Games.update(game._id, {
          $set:{
            players: game.players,
            time_period: game.time_period,
          }
        });

      }, 1000);

	});
}