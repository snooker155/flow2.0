var regions_methods = {

	

};

Regions = new Mongo.Collection("regions", {
	transform: function(doc){

		var newInstance = Object.create(regions_methods);

		return _.extend(newInstance, doc);
	}
});