
// Template.team_creator_form.onRendered(function(){

//  var form = $("#team_creator_form");
 
//     form.validate({
//         errorPlacement: function errorPlacement(error, element) { element.before(error); },
//         rules: {
//             confirm: {
//                 equalTo: "#password"
//             }
//         }
//     });







// Template.company_register_form.onRendered(function(){

// 	var form = $("#company_register_form");
 
//     form.steps({
//         headerTag: "h1",
//         bodyTag: "fieldset",
//         cssClass: "wizard wizard-custom",
//         transitionEffect: "slideLeft",
//         onStepChanging: function (event, currentIndex, newIndex)
//         {
//             // Allways allow previous action even if the current form is not valid!
//             if (currentIndex > newIndex)
//             {
//                 return true;
//             }
//             // Forbid next action on "Warning" step if the user is to young
//             if (newIndex === 3 && Number($("#age-2").val()) < 18)
//             {
//                 return false;
//             }
//             // Needed in some cases if the user went back (clean up)
//             if (currentIndex < newIndex)
//             {
//                 // To remove error styles
//                 form.find(".body:eq(" + newIndex + ") label.error").remove();
//                 form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
//             }
//             form.validate().settings.ignore = ":disabled,:hidden";
//             return form.valid();
//         },
//         onStepChanged: function (event, currentIndex, priorIndex)
//         {
//             if (currentIndex === 1){
//                 console.log($("#company_name").val()+" # "+$("#org_structure").val()+" # "+$("#sphere").val()+" # "+$("#segment").val()+" # "+$("#country").val());
//             }

//             // Used to skip the "Warning" step if the user is old enough.
//             if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
//             {
//                 form.steps("next");
//             }
//             // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
//             if (currentIndex === 2 && priorIndex === 3)
//             {
//                 form.steps("previous");
//             }
//         },
//         onFinishing: function (event, currentIndex)
//         {
//             form.validate().settings.ignore = ":disabled";
//             return form.valid();
//         },
//         onFinished: function (event, currentIndex)
//         {

//             var company_name = event.target.company_name.value;
//             var company_org_structure = event.target.org_structure.value;
//             var company_sphere = event.target.sphere.value;
//             var company_segment = event.target.segment.value;
//             var company_country = event.target.country.value;

//             //console.log(company_name+" # "+company_org_structure+" # "+company_sphere+" # "+company_segment+" # "+company_country+" # "+company_address);
            
//             Meteor.call('addCompany', 
//                 company_name, 
//                 company_org_structure,
//                 company_sphere,
//                 company_segment,
//                 company_country
//                 );

//         }
//     }).validate({
//         errorPlacement: function errorPlacement(error, element) { element.before(error); },
//         rules: {
//             confirm: {
//                 equalTo: "#password"
//             }
//         }
//     });



// });



var index = new ReactiveVar(0);


Template.registration_form.onCreated(function(){
    product_name = null;
    company_array = [];
    team_array = [];
    product_array = [];

    company_array.push({
        company_name: null,
        company_sphere: null,
        company_segment: null,
        company_region: null,
        //company_country: null,
    });


});



Template.registration_form.helpers({
    company_visible: function () {
        if(index.get() == 0){
            return false;
        }else{
            return true;
        }
    },

    team_visible: function(){
        if(index.get() == 1){
            return false;
        }else{
            return true;
        }
    },

    product_visible: function(){
        if(index.get() == 2){
            return false;
        }else{
            return true;
        }
    },

    finish_visible: function(){
        if(index.get() == 3){
            return false;
        }else{
            return true;
        }
    },

    finish_primary: function(){
        if(index.get() == 3){
            return "primary";
        }else{
            return "default";
        }
    },

    next_primary: function(){
        if(index.get() < 3){
            return "primary";
        }else{
            return "default";
        }
    },

    previous_primary: function(){
        if(index.get() > 0){
            return "primary";
        }else{
            return "default";
        }
    },

    previous_disabled: function(){
        if(index.get() <= 0){
            return "disabled";
        }
    },


    finish_disabled: function(){
        if(index.get() != 3){
            return "disabled";
        }
    },

    next_disabled: function(){
        if(index.get() >= 3){
            return "disabled";
        }
    },



});




Template.registration_form.events({
    'click #next': function(event, template){
        event.preventDefault();

        if (index.get() == 0){
            var form = template.$("#company_form");            
        }

        if (index.get() == 1){
            var form = template.$("#team_form");            
        }

        if (index.get() == 2){
            var form = template.$("#product_form");            
        }

        if (index.get() == 3){
            index.set(index.get()+1);            
        }


    
        if (form.valid()){

            index.set(index.get()+1);

            company_array[0].company_name = template.$("#company_name").val();

            product_name = template.$("#product_name").val();

        }
    },


    'click #previous': function(){
        index.set(index.get()-1);
    },


    'click #finish': function(){

        // Meteor.call('assignToRegion', Session.get("game"), company_array[0].company_region, function (error, result) {
        //     if(!error){
        //         Meteor.call('addCompany', company_array[0].company_name, company_array[0].company_sphere, company_array[0].company_segment, company_array[0].company_region, function (error, result) {
        //             if (!error){
        //                 Meteor.call('addToGame', Session.get("game"), result, function (error, result) {});
        //                 Meteor.call('addEmployees', company_array[0].company_name, team_array, function (error, result) {
        //                     if (!error){
        //                         Meteor.call('addProduct', company_array[0].company_name, company_array[0].company_region, company_array[0].company_segment, product_name, product_array, function (error, result) {});
        //                     }
        //                 });
        //             }
        //         });
        //     }
        // });
        
        Meteor.call('addCompany', company_array[0].company_name, company_array[0].company_region, team_array, product_name, product_array, function (error, result) {});
    },
});

