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
  Meteor.publish("departments", function() {
    return Departments.find();
  });
  Meteor.publish("products", function() {
    return Products.find();
  });
  Meteor.publish("features", function() {
    return Features.find();
  });
  Meteor.publish("customers", function() {
    return Customers.find();
  });

