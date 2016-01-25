Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};



Template.navigation.helpers({
	has_company: function (){
    if (Companies.findOne({owner: Meteor.userId()})){
      return true;
    }
  },
  has_product: function(){
    var company = Companies.findOne({owner: Meteor.userId()});
    if (Products.findOne({company_name: company.company_name})){
      return true;
    }
  },

  has_team: function(){
    var company = Companies.findOne({owner: Meteor.userId()});
    if (Employees.findOne({company_name: company.company_name})){
      return true;
    }
  }

});



// Used only on OffCanvas layout
Template.navigation.events({

    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
    }

});