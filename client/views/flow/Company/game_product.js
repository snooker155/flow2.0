

var features_array = [];
var features_arrayDep = new Tracker.Dependency();

var n_features_old = new ReactiveVar(0);

var feature_description_name = new ReactiveVar("Choose");

var feature_description = new ReactiveVar("");

var test_createdAt = new Date();
var test_progress = new ReactiveVar(0);



Template.game_product.onRendered(function(){

});


Template.game_product.onCreated(function(){

});




Template.game_product.helpers({

    features_lists: function(){
        var features = Feature_lists.find({product_id: Products.findOne({owner: Meteor.userId()})._id});
        return features;
    },

    product_name: function(){
        return Products.findOne({owner: Meteor.userId()}).product_name;
    },

    feature_description_name: function(){
        return feature_description_name.get();
    },

    feature_description: function(){
        return feature_description.get();
    },

    feature_completed: function(){
        if(this.progress == 100){
            return true;
        }else{
            return false;
        }
    },

    progress_value: function(){
      var progress = this.progress;
      if (this.updated_time != 0){
        var createdAt = this.updated_time;
      }else{
         var createdAt = this.createdAt;
      }
      var id = this._id;
      var time_to_achieve = this.time_to_achieve;
      var basictime = 100;
      if(this.is_stop){
        return Math.round(progress);
      }else{
        if (progress !== 100){
            if(progress < 100){
                //console.log('progress_start');
                var date = new Date();
                Meteor.setTimeout(function(){
                    //console.log(((date - createdAt)/(time_to_achieve*basictime)).toFixed(2));
                    Meteor.call('updateFeatureProgress', id, (progress + ((date - createdAt)/(time_to_achieve*basictime))));

                  },(time_to_achieve*basictime));
                  //},(1000));
                //console.log('progress_end');
                return Math.round(progress);
            }
            else {
                Meteor.call('updateFeatureProgress', id, 100);
                progress = 100;
                return progress;
            }
        }else{
            return progress;
        }
      }
    },


    progress_bar_value: function(){
        return Math.round(this.progress);
    },




    // test_progress: function(){
    //     var test_date = new Date();
    //     if (test_progress.get() < 100){
    //         Meteor.setTimeout(function(){
    //             //console.log('123');
    //             test_progress.set(((test_date - test_createdAt)/(10*100)).toFixed(2));
    //           },(1000));
    //         return Math.round(test_progress.get());
    //     }else{
    //         return 100;
    //     }
    // },


    // test_progress_bar: function(){
    //     return Math.round(test_progress.get());
    // },




    feature_sum: function(){
        return this.feature_price * this.feature_level;
    },

    new_level: function(){
        if(this.progress == 100){
            return true;
        }else{
            return false;
        }
    },

    is_published: function(){
        return this.is_published;
    },

    new_features_lists: function(){

        var company = Companies.findOne({owner: Meteor.userId()});
        if (Features.find({neccessary_level: { $lte: company.company_level }}).count() - Feature_lists.find({owner: Meteor.userId()}).count() > 0 ){
             var n = Features.find({neccessary_level: { $lte: company.company_level }}).count() - Feature_lists.find({owner: Meteor.userId()}).count();
        }else{
            var n = 0;
        }
        if(n_features_old.get() != n){
            features_array = [];
            var feature_price = 0;
            var feature_level = 1;
            var max_feature_level = 10;
            var time_to_achieve = 0;
            var progress = 0;
            var neccessary_employees_number = 0;
            var available_employees_number = 0;
            for (i=0; i<n; i++){
                features_array.push({
                    id: i,
                    value: i+1,
                    company_name: company.company_name,
                    product_id: Products.findOne({owner: Meteor.userId()})._id,
                    feature_name: null,
                    feature_level: feature_level,
                    max_feature_level: max_feature_level,
                    feature_price: feature_price,
                    time_to_achieve: time_to_achieve,
                    neccessary_employees_number: neccessary_employees_number,
                    available_employees_number: available_employees_number,
                    progress: progress,
                    feature_sum: feature_price * feature_level,
                });
            }
            n_features_old.set(n);
        }
        //console.log(features_array);
        features_arrayDep.depend();
        return features_array;
    },


    features: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        var features = [];
        var feature_lists = Feature_lists.find({owner: Meteor.userId()});
        feature_lists.forEach(function (feature_list) {
            features.push(feature_list.feature_name);
        });
        return Features.find({feature_name: {$nin: features}});
    },


    feature_level_increase_enabled:function(){
        return this.feature_level<this.max_feature_level?"":"disabled";
    },

    feature_level_decrease_enabled:function(){
        return this.feature_level>0?"":"disabled";
    },


    new_feature_level_increase_enabled:function(){
        return this.feature_level<this.max_feature_level?"":"disabled";
    },

    new_feature_level_decrease_enabled:function(){
        return this.feature_level>0?"":"disabled";
    },


    is_stop: function(){
        return this.is_stop;
    },

    not_first_level: function(){
        return this.feature_level !== 1? true: false;
    },


});



Template.game_product.events({
    "click #feature_row": function(){
        event.preventDefault();
        var feature_name = this.feature_name;
        var feature = Features.findOne({feature_name: feature_name});
        if (feature){
            feature_description_name.set(feature.feature_name);
            feature_description.set(feature.feature_description);
        }else{
            feature_description_name.set("Test");
            feature_description.set("Test");
        }
    },


    'change #feature_name': function(event, template){
        event.preventDefault();
        var feature_name = event.target.value;
        var feature = Features.findOne({feature_name: feature_name});
        if (feature){
            this.feature_price = parseInt(feature.feature_price);
            this.feature_sum = this.feature_price * this.feature_level;
            this.feature_name = feature.feature_name;
            this.time_to_achieve = feature.time_to_achieve;
            this.progress = 0;
            this.neccessary_employees_number = feature.neccessary_employees_number * this.feature_level;
            this.available_employees_number = Employees.findOne({owner: Meteor.userId(), department_name: feature.neccessary_department}).employee_number;
            features_arrayDep.changed();
            feature_description_name.set(feature.feature_name);
            feature_description.set(feature.feature_description);
        }else{
            this.feature_price = 0;
            this.feature_sum = this.feature_price * this.feature_level;
            this.feature_name = null;
            this.time_to_achieve = 0;
            this.progress = 0;
            this.neccessary_employees_number = 0;
            this.available_employees_number = 0;
            features_arrayDep.changed();
            feature_description_name.set("Test");
            feature_description.set("Test");
        }
    },


    "click #feature_level_minus": function(event){
            //this.feature_level -= 1;

            Meteor.call('updateFeatureLevel', this._id, this.feature_level -= 1, function (error, result) {});

            // var obj = {
            //     "feature": "feature_level_down",
            //     "value": this.feature_level
            // };
            // //Communication.send('company_change', obj);
            // console.log(obj);
    },

    "click #feature_level_plus": function(event){
            //this.feature_level += 1;

            Meteor.call('updateFeatureLevel', this._id, this.feature_level += 1, function (error, result) {});

            // var obj = {
            //     "feature": "feature_level_up",
            //     "value": this.feature_level
            // };
            // //Communication.send('company_change', obj);
            // console.log(obj);
    },


    "click #new_feature_level_decrease": function(event){
        this.feature_level -= 1;
        this.feature_sum = this.feature_price * this.feature_level;
        this.neccessary_employees_number = Features.findOne({feature_name: this.feature_name}).neccessary_employees_number * this.feature_level;
        features_arrayDep.changed();
    },

    "click #new_feature_level_increase": function(event){
        this.feature_level += 1;
        this.feature_sum = this.feature_price * this.feature_level;
        this.neccessary_employees_number = Features.findOne({feature_name: this.feature_name}).neccessary_employees_number  * this.feature_level;
        features_arrayDep.changed();
    },


    "click #publish": function(){
        Meteor.call('publishFeature', this._id, Session.get("game"), function (error, result) {});
        Meteor.call('updateCompanyExp', this.company_name, 5, function (error, result) {});

    },


    "click #create_new_feature": function(event, template){
        event.preventDefault();

        console.log(this.product_id);
        console.log(features_array[this.id]);


        if(template.$("#new_feature"+this.value).valid()){

            Meteor.call('addFeatureList', this.product_id, features_array[this.id], function (error, result) {});

        }
    },

    'click #stop': function(event){
        event.preventDefault();

        Meteor.call('stopFeature', this._id, function (error, result) {});        
    },

    'click #start': function(event){
        event.preventDefault();

        Meteor.call('startFeature', this._id, function (error, result) {});        
    },

    'click #delete': function(){
        event.preventDefault();

        var product = Products.findOne({owner: Meteor.userId()});

        Meteor.call('deleteFeatureList', this._id, function (error, result) {
            if (!Feature_lists.findOne({ product_id: product._id })){
                Meteor.call('deleteProduct', product._id, function (error, result) {});
            }
        });
    },

});