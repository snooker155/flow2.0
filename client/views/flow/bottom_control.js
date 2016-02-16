
Template.bottom_control.helpers({
    players:function(){
    	var game = Games.findOne({});
    	var players = [];
    	for (var player in game.players){
    		players.push({
	        	player: game.players[player].player,
	        	player_color: game.players[player].player_color,
	        	player_share: Math.round(game.players[player].player_share)-1,
	        	player_share_text: Math.round(game.players[player].player_share),
	        });
    	}
    	return players;
    },

});



Template.bottom_control.events({
    

});