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
		switch(this.regions[region].region_trend){
			case "Negative":
				this.regions[region].region_demand = this.regions[region].region_demand - 0.2;
				break;
			case "Low":
				this.regions[region].region_demand = this.regions[region].region_demand - 0.05;
				break;
			case "Medium":
				this.regions[region].region_demand = this.regions[region].region_demand + 0.05;
				break;
			case "High":
				this.regions[region].region_demand = this.regions[region].region_demand + 0.2;
				break;
		}
	},

	updateRegionMarket: function(region){
		switch(this.regions[region].region_trend){
			case "Negative":
				this.regions[region].region_market = this.regions[region].region_market - 2;
				break;
			case "Low":
				this.regions[region].region_market = this.regions[region].region_market - 0.01;
				break;
			case "Medium":
				this.regions[region].region_market = this.regions[region].region_market + 0.5;
				break;
			case "High":
				this.regions[region].region_market = this.regions[region].region_market + 1;
				break;
		}
	},

	updateRegionTrend: function(region){
		if(this.regions[region].region_demand - this.regions[region].region_market > 2){
			this.regions[region].region_trend = "High";
		}else if (this.regions[region].region_demand - this.regions[region].region_market > 0.2) {
			this.regions[region].region_trend = "Medium";
		}else if (this.regions[region].region_demand - this.regions[region].region_market > 0) {
			this.regions[region].region_trend = "Low";
		}else{
			this.regions[region].region_trend = "Negative";
		}
	},

};

Games = new Mongo.Collection('games', {
	transform: function(doc){

		var newInstance = Object.create(game_methods);

		return _.extend(newInstance, doc);
	}
});

