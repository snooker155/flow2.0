
if(Meteor.isServer){

	Meteor.startup(function () {

		// Games.find().fetch().forEach(function (game) {
		// 	Games.remove(game._id);
		// });

		Regions.find().fetch().forEach(function (region) {
			Regions.remove(region._id);
		});

		Regions.insert({
			region_name: "EU",
			people_all: 1000 + Math.floor((Math.random() * 500) + 100),
			pref: "Design",
		});

		Regions.insert({
			region_name: "AF",
			people_all: 1000 + Math.floor((Math.random() * 500) + 100),
			pref: "Support",
		});

		Regions.insert({
			region_name: "SA",
			people_all: 1000 + Math.floor((Math.random() * 500) + 100),
			pref: "Design",
		});

		Regions.insert({
			region_name: "NA",
			people_all: 1000 + Math.floor((Math.random() * 500) + 100),
			pref: "Technology",
		});

		Regions.insert({
			region_name: "AS",
			people_all: 1000 + Math.floor((Math.random() * 500) + 100),
			pref: "Technology",
		});

		Regions.insert({
			region_name: "OC",
			people_all: 1000 + Math.floor((Math.random() * 500) + 100),
			pref: "Support",
		});


		var players = {};
      	var regions = {};

      	var total_people = 0;

      	Regions.find().forEach(function (region) {
      		total_people += region.people_all;
      	});

      	// var game_id = Games.insert({
      	// 	game_name: "test",
       //  	players: players,
       //  	regions: regions,
       //  	status: "process",
       //  	time_period: 0,
       // 		total_people: total_people,
      	// });


		//////////////////////////////////////////////////////////////////////////////////////////////////////

      	var interval = Meteor.setInterval(function(){

      	var game = Games.findOne({});

        console.log(game.time_period);

        if(game.players){
	        for(var player in game.players){
	        	var players_people = 0;
	            for(var region in game.players[player].regions){
	            	game.players[player].regions[region].people -= 1;
	            	players_people += game.players[player].regions[region].people;
	            	game.players[player].regions[region].share = game.players[player].regions[region].people / Regions.findOne({region_name: region}).people_all * 100;
	            }

	            game.players[player].share = players_people / total_people * 100;
	        }
    	}

    	if(game.players){
	        for(var player in game.players){
	          if(game.players[player].saher <= 0 || game.players[player].share >= 100){
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