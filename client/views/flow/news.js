Template.news.helpers({
	news: function () {
		var news = [
			{
				time_period: 250,
				theme: "New wave of innovations are coming",
				message: "The sceintist from MIT have developed new strong algorythm for predicting future price of stock exchange.",
				demand: 15,
				market: 5,
			},
			{
				time_period: 200,
				theme: "Test theme",
				message: "Test message for testing news functionality.",
				demand: 10,
				market: 15,
			},
		];
		return news;
		//return News.find({});
	},

});