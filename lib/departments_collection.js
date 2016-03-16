var departments_methods = {

	

};

Departments = new Mongo.Collection("departments", {
	transform: function(doc){

		var newInstance = Object.create(departments_methods);

		return _.extend(newInstance, doc);
	}
});