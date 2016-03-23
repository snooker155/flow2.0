var game_methods = {

	getPlayersNumber: function(){
		var players_number = 0;
		for (var player in this.players){
			players_number++;
		}
		return players_number == 0 ? 1 : players_number;
	},

	updatePlayerExp: function(player){
		if (this.players[player].player_exp + 5 <= 100){
			this.players[player].player_exp += 5;
		}else{
			this.players[player].player_level += 1;
			this.players[player].player_exp = 0;
		}
	},

	getPlayerUsers: function(player){
		var users = 0;
		for (var region in this.players[player].regions){
			users += this.players[player].regions[region].people;
		}
		return users;
	},

	getCustomersInRegion: function(region){
		var engaged_people = 0;
		for (var player in this.players){
			if(this.players[player].regions !== undefined && this.players[player].regions[region] !== undefined)
			engaged_people += this.players[player].regions[region].people;
		}
		return engaged_people;
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

	getTotalPeople: function(){
		var total_people = 0;
		for (var region in this.regions){
			total_people += this.regions[region].region_people;
		}
		return total_people;
	},

	getRegionFullness: function(region){
		var region_fullness = 0;
		for (var player in this.players){
			if(this.players[player].regions !== undefined && this.players[player].regions[region] !== undefined){
				region_fullness += this.players[player].regions[region].share;
			}
		}
		return region_fullness;
	},

	getWorldState: function(){
		var world_state = {};
		var level_of_conservatism = 0,
			total_people = this.getTotalPeople(),
			base_price_rate = 0,
			base_profit_rate = 0,
			preferences = "Technology",
			total_demand = 0,
			total_market = 0,
			trend = "";


		for (var region in this.regions){
			total_demand += this.regions[region].region_demand;
		}
		total_demand = parseFloat((total_demand/6).toFixed(2));

		for (var region in this.regions){
			total_market += this.regions[region].region_market;
		}
		total_market = parseFloat((total_market/6).toFixed(2));

		if(total_demand - total_market < 0){
			trend = "Negative";
		}else if(total_demand - total_market < 0.5){
			trend = "Low";
		}else if(total_demand - total_market < 1){
			trend = "Medium";
		}else if (total_demand - total_market > 1) {
			trend = "High";
		}
		
		for (var region in this.regions){
			base_profit_rate += this.regions[region].base_profit_rate;
		}
		base_profit_rate = parseFloat((base_profit_rate).toFixed(2));

		for (var region in this.regions){
			base_price_rate += this.regions[region].base_price_rate;
		}
		base_price_rate = parseFloat((base_price_rate).toFixed(2));

		for (var region in this.regions){
			level_of_conservatism += this.regions[region].level_of_conservatism;
		}
		level_of_conservatism = parseFloat((level_of_conservatism / 6).toFixed(2));

		return world_state = {
			region_name: "World",
			region_full_name: "World",
			level_of_conservatism: level_of_conservatism,
			region_people: total_people,
			base_price_rate: base_price_rate,
			base_profit_rate: base_profit_rate,
			region_pref: preferences,
			region_demand: total_demand,
			region_market: total_market,
			region_trend: trend,
		};
	},

	updateMarketShare: function(username){
		if(this.players[username].regions){
		   	var players_people = 0;
		    for(var region in this.players[username].regions){
		       	if(this.players[username].regions[region].people > 0){
		       		this.players[username].player_balance += this.players[username].regions[region].people * this.regions[region].base_profit_rate; 
		        	this.players[username].regions[region].people -= 1;
		        	players_people += this.players[username].regions[region].people;
		        	this.players[username].regions[region].share = this.players[username].regions[region].people / this.regions[region].region_people * 100;
		        	this.updatePriceProfit(username, region);
		       	}
		   	}
		    this.players[username].player_share = players_people / this.getTotalPeople() * 100;
	    }
	},

	updatePriceProfit: function(username, region){
		var price = this.regions[region].level_of_conservatism * this.players[username].regions[region].share + this.regions[region].base_price_rate; 

		this.players[username].regions[region].price = Math.round(price*10);

		this.players[username].regions[region].profit = this.regions[region].base_profit_rate;
	},

	updateLevelOfConservatism: function(reigon){
		this.regions[region].level_of_conservatism -= 0.0005;
	},

	updateRegionBaseProfitRate: function(region){
		this.regions[region].base_profit_rate -= 0.0001;
	},

	updateRegionPeople: function(region){
		this.regions[region].region_people += this.regions[region].region_people * (this.regions[region].region_demand / 100);
		for (var player in this.players){
			if(this.players[player].regions !== undefined && this.players[player].regions[region] !== undefined){
				if(this.regions[region].region_demand / 100 < 0){
					this.players[player].regions[region].people += this.players[player].regions[region].people * (this.regions[region].region_demand / 100);
				}
			}
		}
	},

	updateRegionBasePriceRate: function(region){
		this.regions[region].base_price_rate += this.regions[region].base_price_rate * (this.regions[region].region_market / 100);		
	},


	updateRegionDemand: function(region, value){
		this.regions[region].region_demand = this.regions[region].region_demand - value;
	},

	updateRegionMarket: function(region, value){
		this.regions[region].region_market = this.regions[region].region_market - value;
	},

	updateRegionTrend: function(region){
		if(this.regions[region].region_demand - this.regions[region].region_market < 0){
			this.regions[region].region_trend = "Negative";
		}else if(this.regions[region].region_demand - this.regions[region].region_market < 0.5){
			this.regions[region].region_trend = "Low";
		}else if(this.regions[region].region_demand - this.regions[region].region_market < 1){
			this.regions[region].region_trend = "Medium";
		}else if (this.regions[region].region_demand - this.regions[region].region_market > 1) {
			this.regions[region].region_trend = "High";
		}
	},

	buyShare: function(region_name, player){
		var price = 0;
	    if(region_name !== null){
	        price = this.players[player].regions[region_name].price;
	        if(this.players[player].regions[region_name].share < 100){
	        	if(this.regions[region_name].region_people - this.getCustomersInRegion(region_name) - 10 > 0){
	          		this.players[player].regions[region_name].people += 10;
	          	}else{
	          		for (var other_player in this.players){
	          			if(other_player !== player){
	          				this.players[other_player].regions[region_name].people -= (10 / (this.getPlayersNumber()-1));
	          			}
	          		}
	          		this.players[player].regions[region_name].people += 10;
	          	}
	        }
	    }else{
	        for(var region in this.players[player].regions){
	          price += this.players[player].regions[region].price;
	          if(this.players[player].regions[region].share < 100){
	            this.players[player].regions[region].people += 10;
	          }
	        }
	      }

      	this.players[player].player_balance -= price;
	},

};

Games = new Mongo.Collection('games', {
	transform: function(doc){

		var newInstance = Object.create(game_methods);

		return _.extend(newInstance, doc);
	}
});
