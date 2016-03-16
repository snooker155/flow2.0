var features_methods = {

	

};

Features = new Mongo.Collection("features", {
	transform: function(doc){

		var newInstance = Object.create(features_methods);

		return _.extend(newInstance, doc);
	}
});