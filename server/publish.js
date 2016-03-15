  Meteor.publish("users", function() {
    return Meteor.users.find();
  });
  Meteor.publish("games", function() {
    return Games.find();
  });
  Meteor.publish("regions", function() {
    return Regions.find();
  });
  Meteor.publish("companies", function() {
    return Companies.find();
  });
  Meteor.publish("news", function() {
    return News.find();
  });
