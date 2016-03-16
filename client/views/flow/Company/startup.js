

Template.startup.helpers({
    has_team: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        if (company){
          return true;
        }
    },

    has_product: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        if (company){
          return true;
        }
    },
});