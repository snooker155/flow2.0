var companies_methods = {

	

};

Companies = new Mongo.Collection("companies", {
	transform: function(doc){

		var newInstance = Object.create(companies_methods);

		return _.extend(newInstance, doc);
	}
});