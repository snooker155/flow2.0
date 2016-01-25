Template.users.helpers({
    users: function (){
    	console.log(Meteor.users.find().fetch());
      	return Meteor.users.find();
    },

    number_of_users: function(){
    	return Meteor.users.find().count();
    }
});




Template.companies.helpers({
    companies: function (){
    	console.log(Companies.find().fetch());
      	return Companies.find();
    },

    number_of_companies: function(){
    	return Companies.find().count();
    }
});




Template.users.events({
    // "click #save": function (event){
    // 	var username = $("#"+this._id+"username").val();;
    // 	// var address = $("#"+this._id+"address").val();
    // 	var profile_name = $("#"+this._id+"profile_name").val();
    // 	console.log(username+" # "+profile_name);
    //   	Meteor.call("setUsername", this._id, username);
    // },

    "click #delete": function(event){
    	//console.log(Meteor.users.findOne({_id: this._id}));
    	Meteor.call("deleteUser",this._id);
    }
});





Template.companies.events({
    "click #save": function (event){
    	var money = $("#company_balance").val();;
      Meteor.call("saveCompany", this._id, money);
    },

    "click #delete": function(event){
    	//console.log(Meteor.users.findOne({_id: this._id}));
    	Meteor.call("deleteCompany",this._id);
    }
});





var segments_list = new ReactiveVar(1);


  Template.spheres.helpers({
    spheres: function () {
      return Spheres.find();
    },


    segments_list: function(){
      console.log(segments_list.get());
      result = [];
      for(i=1; i<segments_list.get(); i++){
        result.push({value: i});
      }
      return result;
    },

    unremoveable: function(){
      return segments_list.get() > 1;
    },

    number_of_spheres: function(){
        return Spheres.find().count();
    },


  });



  Template.spheres.events({

    'submit #create_sphere': function(event, template){
      event.preventDefault();

      var sphere_name = event.target.sphere_name.value;

      console.log(segments_list.get());

      var input = [];
      for (i=0; i<segments_list.get(); i++){
        input.push({
          id: i,
          segment_name: template.$('[id=segment_name'+i+']').val(),
        });
        template.$('[id=segment_name'+i+']').val("");
      }

        console.log(sphere_name);
        console.log(input);

      Meteor.call('addSphere', sphere_name, input);

      event.target.sphere_name.value = "";
    },

    'click #add_segment': function(){
      segments_list.set(segments_list.get()+1);
    },

    'click #remove_segment': function(){
      segments_list.set(segments_list.get()-1);
    },

    'click #save': function(){
      var sphere_name = $("#"+this._id+"sphere_name").val();
      console.log(sphere_name);
      Meteor.call('saveSphere', this._id, sphere_name, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteSphere', this._id, function (error, result) {});
    }


  });


  Template.sphere.helpers({
    sphere_segments: function (){
      //console.log(Segments.find({sphere_name: this.sphere_name}).fetch());  
      return Segments.find({sphere_id: this._id});
    },


  });




  Template.segments.helpers({
    segments: function () {
      return Segments.find();
    },

    number_of_segments: function(){
        return Segments.find().count();
    },


  });



  Template.segments.events({

    'submit #create_segment': function(event, template){
      event.preventDefault();

      var segment_name = event.target.segment_name.value;

      Meteor.call('addSegment', segment_name);

      event.target.segment_name.value = "";
    },

    'click #save': function(){
      var segment_name = $("#"+this._id+"segment_name").val();
      console.log(segment_name);
      Meteor.call('saveSegment', this._id, segment_name, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteSegment', this._id, function (error, result) {});
    }


  });




  Template.countries.helpers({
    countries: function () {
      return Countries.find();
    },

    number_of_countries: function(){
        return Countries.find().count();
    },


  });



  Template.countries.events({

    'submit #create_country': function(event, template){
      event.preventDefault();

      var country_name = event.target.country_name.value;

      Meteor.call('addCountry', country_name);

      event.target.country_name.value = "";
    },

    'click #save': function(){
      var country_name = $("#"+this._id+"country_name").val();
      console.log(country_name);
      Meteor.call('saveCountry', this._id, country_name, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteCountry', this._id, function (error, result) {});
    }


  });




  Template.departments.helpers({
    departments: function () {
      return Departments.find();
    },

    number_of_departments: function(){
        return Departments.find().count();
    },


  });



  Template.departments.events({

    'submit #create_department': function(event, template){
      event.preventDefault();

      var department_name = event.target.department_name.value;
      var employee_price = event.target.employee_price.value;
      var department_description = event.target.department_description.value;

      Meteor.call('addDepartment', department_name, employee_price, department_description);

      event.target.department_name.value = "";
      event.target.employee_price.value = "";
      event.target.department_description.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      Meteor.call('saveDepartment', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteDepartment', this._id, function (error, result) {});
    }


  });





  Template.news_list.helpers({
    news_list: function () {
      return News.find();
    },

    number_of_news: function(){
      return News.find().count();
    },

    companies: function(){
      return Companies.find({});
    }


  });



  Template.news_list.events({

    'submit #create_news': function(event, template){
      event.preventDefault();

      var news_title = event.target.news_title.value;
      var news_type = event.target.news_type.value;
      var news_subject = event.target.news_subject.value;
      var news_parameter = event.target.news_parameter.value;
      var news_value = event.target.news_value.value;
      var news_message = event.target.news_message.value;

      console.log(news_title+" # "+news_type+" # "+news_subject+" # "+news_parameter+" # "+news_value+" # "+news_message);

      Meteor.call('addNews', news_title, news_type, news_subject, news_parameter, news_value, news_message);

      event.target.news_title.value = "";
      event.target.news_type.value = "Type";
      event.target.news_subject.value = "Company";
      event.target.news_parameter.value = "Parameter";
      event.target.news_value.value = "";
      event.target.news_message.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      Meteor.call('saveNews', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
        Meteor.call('deleteNews', this._id, function (error, result) {});
    }


  });




  Template.employees_list.helpers({
    employees_list: function () {
      return Employees.find();
    },

    number_of_employees: function(){
      return Employees.find().count();
    },

    companies: function(){
      return Companies.find({});
    }


  });



  Template.employees_list.events({

    'submit #create_employees': function(event, template){
      event.preventDefault();

      var news_title = event.target.news_title.value;
      var news_type = event.target.news_type.value;
      var news_subject = event.target.news_subject.value;
      var news_parameter = event.target.news_parameter.value;
      var news_value = event.target.news_value.value;
      var news_message = event.target.news_message.value;

      console.log(news_title+" # "+news_type+" # "+news_subject+" # "+news_parameter+" # "+news_value+" # "+news_message);

      //Meteor.call('addNews', news_title, news_type, news_subject, news_parameter, news_value, news_message);

      event.target.news_title.value = "";
      event.target.news_type.value = "Type";
      event.target.news_subject.value = "Company";
      event.target.news_parameter.value = "Parameter";
      event.target.news_value.value = "";
      event.target.news_message.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      //Meteor.call('saveEmployees', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
      Meteor.call('deleteEmployees', this._id, function (error, result) {});
    }


  });




  Template.activities_list.helpers({
    activities_list: function () {
      return Activities.find();
    },

    number_of_activities: function(){
      return Activities.find().count();
    },

    companies: function(){
      return Companies.find({});
    }


  });



  Template.activities_list.events({

    'submit #create_activity': function(event, template){
      event.preventDefault();

      var news_title = event.target.news_title.value;
      var news_type = event.target.news_type.value;
      var news_subject = event.target.news_subject.value;
      var news_parameter = event.target.news_parameter.value;
      var news_value = event.target.news_value.value;
      var news_message = event.target.news_message.value;

      console.log(news_title+" # "+news_type+" # "+news_subject+" # "+news_parameter+" # "+news_value+" # "+news_message);

      //Meteor.call('addActivities', news_title, news_type, news_subject, news_parameter, news_value, news_message);

      event.target.news_title.value = "";
      event.target.news_type.value = "Type";
      event.target.news_subject.value = "Company";
      event.target.news_parameter.value = "Parameter";
      event.target.news_value.value = "";
      event.target.news_message.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      //Meteor.call('saveActivities', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
      Meteor.call('deleteActivities', this._id, function (error, result) {});
    }


  });






  Template.features_list.helpers({
    features_list: function () {
      return Features.find();
    },

    number_of_features: function(){
      return Features.find().count();
    },

    segments: function(){
      return Segments.find({});
    },

    departments: function(){
      return Departments.find();
    },


  });



  Template.features_list.events({

    'submit #create_feature': function(event, template){
      event.preventDefault();

      var feature_name = event.target.feature_name.value;
      var time_to_achieve = event.target.time_to_achieve.value;
      var feature_level = event.target.feature_level.value;
      var feature_price = event.target.feature_price.value;
      var neccessary_level = event.target.neccessary_level.value;
      var feature_segment = event.target.feature_segment.value;
      var feature_description = event.target.feature_description.value;
      var neccesssary_department = event.target.neccesssary_department.value;
      var neccessary_department_level = event.target.neccessary_department_level.value;
      var neccessary_employees_number = event.target.neccessary_employees_number.value;

      //console.log(feature_name+" # "+time_to_achieve+" # "+neccessary_level+" # "+feature_segment+" # "+neccesssary_department+" # "+neccessary_department_level+" # "+feature_description);

      Meteor.call('addFeature', feature_name, time_to_achieve, feature_level, feature_price, neccessary_level, feature_segment, neccesssary_department, neccessary_department_level, neccessary_employees_number, feature_description);

      event.target.feature_name.value = "";
      event.target.time_to_achieve.value = "";
      event.target.feature_level.value = "";
      event.target.feature_price.value = "";
      event.target.neccessary_level.value = "";
      event.target.feature_segment.value = "";
      event.target.feature_description.value = "";
      event.target.neccesssary_department.value = "";
      event.target.neccessary_department_level.value = "";
      event.target.neccessary_employees_number.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      //Meteor.call('saveFeature', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
      Meteor.call('deleteFeature', this._id, function (error, result) {});
    }


  });








  Template.features_lists.helpers({
    features_lists: function () {
      return Feature_lists.find();
    },

    number_of_features_lists: function(){
      return Feature_lists.find().count();
    },

  });



  Template.features_lists.events({

    'submit #create_feature': function(event, template){
      event.preventDefault();

      var feature_name = event.target.feature_name.value;
      var time_to_achieve = event.target.time_to_achieve.value;
      var feature_level = event.target.feature_level.value;
      var feature_price = event.target.feature_price.value;
      var neccessary_level = event.target.neccessary_level.value;
      var feature_segment = event.target.feature_segment.value;
      var feature_description = event.target.feature_description.value;
      var neccesssary_department = event.target.neccesssary_department.value;
      var neccessary_department_level = event.target.neccessary_department_level.value;

      //console.log(feature_name+" # "+time_to_achieve+" # "+neccessary_level+" # "+feature_segment+" # "+neccesssary_department+" # "+neccessary_department_level+" # "+feature_description);

      Meteor.call('addFeature', feature_name, time_to_achieve, feature_level, feature_price, neccessary_level, feature_segment, neccesssary_department, neccessary_department_level, feature_description);

      event.target.feature_name.value = "";
      event.target.time_to_achieve.value = "";
      event.target.feature_level.value = "";
      event.target.feature_price.value = "";
      event.target.neccessary_level.value = "";
      event.target.feature_segment.value = "";
      event.target.feature_description.value = "";
      event.target.neccesssary_department.value = "";
      event.target.neccessary_department_level.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      //Meteor.call('saveFeature', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
      Meteor.call('deleteFeatureList', this._id, function (error, result) {});
    }


  });





  Template.admin_products.helpers({
    products: function () {
      return Products.find();
    },

    number_of_products: function(){
      return Products.find().count();
    },

  });



  Template.admin_products.events({

    'submit #create_feature': function(event, template){
      event.preventDefault();

      var feature_name = event.target.feature_name.value;
      var time_to_achieve = event.target.time_to_achieve.value;
      var feature_level = event.target.feature_level.value;
      var feature_price = event.target.feature_price.value;
      var neccessary_level = event.target.neccessary_level.value;
      var feature_segment = event.target.feature_segment.value;
      var feature_description = event.target.feature_description.value;
      var neccesssary_department = event.target.neccesssary_department.value;
      var neccessary_department_level = event.target.neccessary_department_level.value;

      //console.log(feature_name+" # "+time_to_achieve+" # "+neccessary_level+" # "+feature_segment+" # "+neccesssary_department+" # "+neccessary_department_level+" # "+feature_description);

      //Meteor.call('addFeature', feature_name, time_to_achieve, feature_level, feature_price, neccessary_level, feature_segment, neccesssary_department, neccessary_department_level, feature_description);

      event.target.feature_name.value = "";
      event.target.time_to_achieve.value = "";
      event.target.feature_level.value = "";
      event.target.feature_price.value = "";
      event.target.neccessary_level.value = "";
      event.target.feature_segment.value = "";
      event.target.feature_description.value = "";
      event.target.neccesssary_department.value = "";
      event.target.neccessary_department_level.value = "";
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      //Meteor.call('saveFeature', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
      Meteor.call('deleteProduct', this._id, function (error, result) {});
    }


  });







  Template.admin_marketing.helpers({
    admin_marketing_channels: function () {
      return Marketing_channels.find();
    },

    number_of_admin_marketing_channels: function(){
      return Marketing_channels.find().count();
    },

  });



  Template.admin_marketing.events({

    'submit #create_channel': function(event, template){
      event.preventDefault();

      var channel_name = event.target.channel_name.value;
      var channel_capacity = event.target.channel_capacity.value;
      var channel_cost = event.target.channel_cost.value;
      var channel_description = event.target.channel_description.value;

      //console.log(channel_name+" # "+channel_capacity+" # "+channel_cost+" # "+channel_description);

      Meteor.call('addChannel', channel_name, channel_capacity, channel_cost, channel_description);

      event.target.channel_name.value = "";
      event.target.channel_capacity.value = "";
      event.target.channel_cost.value = "";
      event.target.channel_description.value = "";
      
    },

    'click #save': function(){
      var department_name = $("#"+this._id+"department_name").val();
      var employee_price = $("#"+this._id+"employee_price").val();
  
      //Meteor.call('saveChannel', this._id, department_name, employee_price, function (error, result) {});
    },

    'click #delete': function(){
      Meteor.call('deleteChannel', this._id, function (error, result) {});
    }


  });

