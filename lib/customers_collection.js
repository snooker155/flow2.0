var customers_methods = {

	

};

Customers = new Mongo.Collection("customers", {
	transform: function(doc){

		var newInstance = Object.create(customers_methods);

		return _.extend(newInstance, doc);
	}
});