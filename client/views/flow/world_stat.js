Template.world_stat.helpers({
	time_period: function () {
		var game = Games.findOne({});
		return game.time_period;
	},

	players_number: function(){
		var game = Games.findOne({});
		return game.getPlayersNumber();
	}
});