
Template.bottom_control.helpers({
    // players:function(){
    // 	var game = Games.findOne({});
    // 	var players = [];
    // 	for (var player in game.players){
    // 		players.push({
	   //      	player: game.players[player].player,
	   //      	player_color: game.players[player].player_color,
	   //      	player_share: Math.round(game.players[player].player_share)-1,
	   //      	player_share_text: Math.round(game.players[player].player_share),
	   //      });
    // 	}
    // 	return players;
    // },

    player: function(){
    	var game = Games.findOne({});
        if(game.players[Meteor.user().username]){
    	   return game.players[Meteor.user().username].player;
        }
    },

    player_share: function(){
    	var game = Games.findOne({});
        if (game.players[Meteor.user().username] !== undefined && game.players[Meteor.user().username].player_share !== undefined){
    	   return Math.round(game.players[Meteor.user().username].player_share);
        }else{
            return 0;
        }
    },

    free_share: function(){
    	var game = Games.findOne({});
    	if(game.players[Meteor.user().username] !== undefined && game.players[Meteor.user().username].player_share !== undefined){
    		return Math.round(100 - game.players[Meteor.user().username].player_share);
    	}else{
    		return 100;
    	}
    },

});



Template.bottom_control.events({
    

});