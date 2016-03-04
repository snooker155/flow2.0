Template.company_stat.helpers({
	player_balance: function () {
		var game = Games.findOne({});
		return Math.round(game.players[Meteor.user().username].player_balance);
	},

	player_users: function(){
		var game = Games.findOne({});
		return Math.round(game.getPlayerUsers(Meteor.user().username));
	},

    player_world_share: function(){
    	var game = Games.findOne({});
    	if(game.players[Meteor.user().username] !== undefined && game.players[Meteor.user().username].player_share !== undefined){
			return parseFloat((game.players[Meteor.user().username].player_share).toFixed(2));
		}else{
			return 0;
		}
	},

    player_regions: function(){
    	var game = Games.findOne({});
    	var region_number = 0;
    	for (var region in game.players[Meteor.user().username].regions){
    		region_number++;
    	}
		return region_number;
	},

    player_branches: function(){
    	var game = Games.findOne({});
		var branches_number = 0;
    	for (var region in game.players[Meteor.user().username].regions){
    		branches_number++;
    	}
		return branches_number;
	},
});