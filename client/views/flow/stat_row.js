Template.stat_row.helpers({
	player: function () {
		var game = Games.findOne({});
		return game.players[Meteor.user().username];
	}
});