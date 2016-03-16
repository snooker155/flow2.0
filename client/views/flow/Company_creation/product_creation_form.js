
var features_array = [];
var features_arrayDep = new Tracker.Dependency();




Template.product_creation_form.onCreated(function(){

    features_array = [];
    // var company = Companies.findOne({ owner: Meteor.userId() })
    // var features = Features.find({neccessary_level: { $lte: company.company_level } });
    var features = Features.find({neccessary_level: { $lte: 1 } });
    //console.log(features.fetch());
    var feature_price = 0;
    var feature_level = 0;
    var max_feature_level = 10;
    var time_to_achieve = 0;
    var progress = 0;
    var neccessary_employees_number = 0;
    var available_employees_number = 0;
    var i = 0;
    features.forEach(function (feature) {
        features_array.push({
            id: i,
            value: i+1,
            //company_name: Companies.findOne({owner: Meteor.userId()}).company_name,
            feature_name: feature.feature_name,
            feature_level: feature_level,
            max_feature_level: max_feature_level,
            feature_price: feature_price,
            time_to_achieve: time_to_achieve,
            neccessary_employees_number: neccessary_employees_number,
            available_employees_number: available_employees_number,
            progress: progress,
            feature_sum: feature_price * feature_level,
        });
        i++;
    });

});





var feature_description_name = new ReactiveVar("Choose");

var feature_description = new ReactiveVar("");






Template.product_creation_form.helpers({

    features_list: function(){
        features_arrayDep.depend();
        return features_array;
    },

    features: function(){
        // var company = Companies.findOne({ owner: Meteor.userId() });
        // return Features.find({neccessary_level: { $lte: company.company_level }});
        return Features.find({neccessary_level: { $lte: 1 }});
    },

    feature_level_increase_enabled:function(){
        return this.feature_level<this.max_feature_level?"":"disabled";
    },

    feature_level_decrease_enabled:function(){
        return this.feature_level>0?"":"disabled";
    },

    feature_description_name: function(){
        return feature_description_name.get();
    },

    feature_description: function(){
        return feature_description.get();
    },

});





Template.product_creation_form.events({
    'change .feature_name': function(event, template){
        event.preventDefault();
        var feature_name = event.target.value;
        var feature = Features.findOne({feature_name: feature_name});
        if (feature){
            this.feature_price = feature.feature_price;
            this.feature_level = 1;
            this.feature_sum = this.feature_price * this.feature_level;
            this.feature_name = feature.feature_name;
            this.time_to_achieve = feature.time_to_achieve;
            this.progress = 0;
            this.neccessary_employees_number = feature.neccessary_employees_number * this.feature_level;
            //this.available_employees_number = Employees.findOne({owner: Meteor.userId(), department_name: feature.neccessary_department}).employee_number;
            features_arrayDep.changed();
            feature_description_name.set(feature.feature_name);
            feature_description.set(feature.feature_description);
        }else{
            this.feature_price = 0;
            this.feature_level = 0;
            this.feature_sum = this.feature_price * this.feature_level;
            this.feature_name = null;
            this.time_to_achieve = 0;
            this.progress = 0;
            this.neccessary_employees_number = 0;
            //this.available_employees_number = 0;
            features_arrayDep.changed();
            feature_description_name.set("Test");
            feature_description.set("Test");
        }

        product_array = features_array;
    },

    "click #feature_level_increase": function(){
        this.feature_level += 1;
        this.feature_sum = this.feature_price * this.feature_level;
        this.neccessary_employees_number = Features.findOne({feature_name: this.feature_name}).neccessary_employees_number  * this.feature_level;
        features_arrayDep.changed();

        product_array = features_array;
    },

    "click #feature_level_decrease": function(){
        this.feature_level -= 1;
        this.feature_sum = this.feature_price * this.feature_level;
        this.neccessary_employees_number = Features.findOne({feature_name: this.feature_name}).neccessary_employees_number * this.feature_level;
        features_arrayDep.changed();

        product_array = features_array;
    },


    "submit #product_form": function(event, template){
        event.preventDefault();

        var product_name = event.target.product_name.value;

        // console.log(product_name);
        // console.log(features_array);

        var company = Companies.findOne({ owner: Meteor.userId() });

        if(template.$("#product_form").valid()){
            Meteor.call('addProduct', company.company_name, company.company_country, company.company_segment, product_name, features_array, function (error, result) {});
        }
    }
});