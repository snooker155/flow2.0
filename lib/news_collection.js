var news_methods = {

	

};

News = new Mongo.Collection('news', {
	transform: function(doc){

		var newInstance = Object.create(news_methods);

		return _.extend(newInstance, doc);
	}
});
