Companies = new Mongo.Collection("companies");
Regions = new Mongo.Collection("regions");


var game_methods = {

	updatePriceProfit: function(username, region){
		var price = 1/Regions.findOne({region_name: region}).base_price_rate * this.players[username].regions[region].people + Regions.findOne({region_name: region}).base_price_rate * this.players[username].regions[region].people; 

		this.players[username].regions[region].price = Math.round(price*10);
	}

};

Games = new Mongo.Collection('games', {
	transform: function(doc){

		var newInstance = Object.create(game_methods);

		return _.extend(newInstance, doc);
	}
});

