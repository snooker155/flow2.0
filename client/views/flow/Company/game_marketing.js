
var channel_description_name = new ReactiveVar("Choose");

var channel_description = new ReactiveVar("");




Template.game_marketing.helpers({

    marketing_channels: function(){
        return Marketing_channels.find({});
    },

    channel_description_name: function(){
        return channel_description_name.get();
    },

    channel_description: function(){
        return channel_description.get();
    },

});



Template.game_marketing.events({
    "click #channel_row": function(){
        event.preventDefault();
        var channel_name = this.channel_name;
        var channel = Marketing_channels.findOne({channel_name: channel_name});
        if (channel){
            channel_description_name.set(channel.channel_name);
            channel_description.set(channel.channel_description);
        }else{
            channel_description_name.set("Test");
            channel_description.set("Test");
        }
    },
});