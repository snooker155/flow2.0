Template.company_creation_form.onCreated(function(){

});



Template.company_creation_form.helpers({
    spheres:function(){
        return Spheres.find();
    },

    segments:function(){
        return Segments.find({sphere_name: "IT"});
    },

    regions:function(){
        return Regions.find();
    },

    // countries:function(){
    //     return Countries.find();
    // },
});





Template.company_creation_form.events({
    'change #sphere': function(event, template){
        event.preventDefault();
        var sphere_name = event.target.value;
        var segments = Segments.find({sphere_name: sphere_name}).fetch();
        var segment_list = document.getElementById("segment");
        segment_list.innerHTML = "";
        var default_option = document.createElement("option");
        default_option.text = "Select segment";
        segment_list.add(default_option);
        segments.forEach(function (segment) {
            var option = document.createElement("option");
            option.text = segment.segment_name;
            segment_list.add(option);
        });

        company_array[0].company_sphere = sphere_name;
    },

    'change #segment': function(){
        event.preventDefault();
        var company_segment = event.target.value;
        company_array[0].company_segment = company_segment;
    },

    'change #region': function(){
        event.preventDefault();
        var company_region = event.target.value;
        company_array[0].company_region = company_region;
    },

    // 'change #country': function(){
    //     event.preventDefault();
    //     var company_country = event.target.value;
    //     company_array[0].company_country = company_country;
    // },

    // 'change #org_structure': function(){
    //     event.preventDefault();
    //     var company_org_structure = event.target.value;
    //     company_array[0].company_org_structure = company_org_structure;
    // },

});