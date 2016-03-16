var products_methods = {

	

};

Products = new Mongo.Collection("products", {
	transform: function(doc){

		var newInstance = Object.create(products_methods);

		return _.extend(newInstance, doc);
	}
});