Template.game_company.helpers({
    activities_list: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        return Activities.find({company_name: company.company_name}, {sort: {createdAt: -1}, limit: 8});
    },

    company_name: function(){
        return Companies.findOne({owner: Meteor.userId()}).company_name;
    },

    org_structure: function(){
        return Companies.findOne({owner: Meteor.userId()}).company_org_structure;
    },

    company_level: function(){
        return Companies.findOne({owner: Meteor.userId()}).company_level;
    },

    company_partners: function(){
        return 0;
    },

    company_articles: function(){
        return 0;
    },

    company_sphere: function(){
        return Companies.findOne({owner: Meteor.userId()}).company_sphere;
    },

    company_segment: function(){
        return Companies.findOne({owner: Meteor.userId()}).company_segment;
    },

    company_country: function(){
        return Companies.findOne({owner: Meteor.userId()}).company_country;
    },

    number_of_departments: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        return Employees.find({company_name: company.company_name}).count();
    },

    number_of_employees: function(){
        var count = 0;
        var company = Companies.findOne({owner: Meteor.userId()});
        var employees = Employees.find({company_name: company.company_name});
        employees.forEach(function (employee) {
            count += employee.employee_number;
        });
        return count;
    },

    company_product: function(){
        if (Products.findOne({owner: Meteor.userId()})){
            return Products.findOne({owner: Meteor.userId()}).product_name;
        }else{
            return "No product yet";
        }
        
    },

    username: function(){
        return Companies.findOne({owner: Meteor.userId()}).username;
    },

    createdAt: function(){
        return Companies.findOne({owner: Meteor.userId()}).createdAt;
    },

});