Companies = new Mongo.Collection("companies");
Regions = new Mongo.Collection("regions");


var game_methods = {

	getPlayersNumber: function(){
		var players_number = 0;
		for (var player in this.players){
			players_number++;
		}
		return players_number == 0 ? 1 : players_number;
	},

	getCustomersNumber: function(){
		var customers_number = 0;
		for (var player in this.players){
			for (var region in this.players[player].regions){
				if(this.players[player].regions !== undefined && this.players[player].regions[region] !== undefined){
					customers_number += this.players[player].regions[region].people;
				}
			}
		}
		return customers_number == 0 ? 0 : customers_number;
	},

	updatePriceProfit: function(username, region){
		var price = 1/Regions.findOne({region_name: region}).base_price_rate * this.players[username].regions[region].people + Regions.findOne({region_name: region}).base_price_rate * this.players[username].regions[region].people; 

		this.players[username].regions[region].price = Math.round(price*10);

		this.players[username].regions[region].profit = this.regions[region].base_profit_rate;
	},

	updateRegionBasePriceRate: function(region){
		this.regions[region].base_price_rate -= this.regions[region].base_price_rate * (this.regions[region].region_demand / 100) - this.regions[region].base_price_rate * (this.regions[region].region_market / 100);
	},

	updateRegionBaseProfitRate: function(region){
		this.regions[region].base_profit_rate -= this.regions[region].base_profit_rate * (this.regions[region].region_market / 100);

		this.regions[region].base_profit_rate = this.regions[region].base_profit_rate / this.getPlayersNumber();
	},

	updateRegionDemand: function(region){
		this.regions[region].region_demand = (10 - this.getCustomersNumber()/this.total_people) * ((Math.random() * 3) - 1);
	},

	updateRegionMarket: function(region){
		this.regions[region].region_market = this.regions[region].region_demand * ((Math.random() * 3) - 1);
	},

};

Games = new Mongo.Collection('games', {
	transform: function(doc){

		var newInstance = Object.create(game_methods);

		return _.extend(newInstance, doc);
	}
});

