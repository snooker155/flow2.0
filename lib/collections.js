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

		//this.regions[region].base_profit_rate = this.regions[region].base_profit_rate / this.getPlayersNumber();
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


	updateRegionDemand: function(region){
		// switch(this.regions[region].region_trend){
		// 	case "Negative":
		// 		this.regions[region].region_demand = this.regions[region].region_demand - 0.2;
		// 		break;
		// 	case "Low":
		// 		this.regions[region].region_demand = this.regions[region].region_demand - 0.05;
		// 		break;
		// 	case "Medium":
		// 		this.regions[region].region_demand = this.regions[region].region_demand + 0.05;
		// 		break;
		// 	case "High":
		// 		this.regions[region].region_demand = this.regions[region].region_demand + 0.2;
		// 		break;
		// }
		this.regions[region].region_demand = this.regions[region].region_demand - 0.6 + (((Math.random() * 10) - 5)/100);
	},

	updateRegionMarket: function(region){
		// switch(this.regions[region].region_trend){
		// 	case "Negative":
		// 		this.regions[region].region_market = this.regions[region].region_market - 2;
		// 		break;
		// 	case "Low":
		// 		this.regions[region].region_market = this.regions[region].region_market - 0.01;
		// 		break;
		// 	case "Medium":
		// 		this.regions[region].region_market = this.regions[region].region_market + 0.5;
		// 		break;
		// 	case "High":
		// 		this.regions[region].region_market = this.regions[region].region_market + 1;
		// 		break;
		// }
		this.regions[region].region_market = this.regions[region].region_market - 0.2 + (((Math.random() * 4) - 2)/100);
	},

	updateRegionTrend: function(region){
		// if(this.regions[region].region_demand < 0 && this.regions[region].region_market < 0){
		// 	this.regions[region].region_trend = "Negative";
		// }else if(this.regions[region].region_demand < 0.5 && this.regions[region].region_market < 0.5){
		// 	this.regions[region].region_trend = "Low";
		// }else if(this.regions[region].region_demand < 1 && this.regions[region].region_market < 1){
		// 	this.regions[region].region_trend = "Medium";
		// }else if (this.regions[region].region_demand > 1 && this.regions[region].region_market > 1) {
		// 	this.regions[region].region_trend = "High";
		// }
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

