Template.customers_info.onRendered(function(){
	var times = function(n) {
	  return Array.apply(null, new Array(n));
	};

	var data = times(Customers.find().count()).map(Math.random).reduce(function(data, rnd, index) {
	  data.labels.push(index + 1);
	  data.series.forEach(function(series) {
	    series.push(Math.random() * 100)
	  });

	  return data;
	}, {
	  labels: [],
	  series: times(6).map(function() { return new Array() })
	});


    // var eu_array = [];
    // Customers.find().fetch().forEach(function (customer) {
    //     if(customer.customer_region == "EU"){
    //         eu_array.push(customer.customer_money);
    //     }
    // });

    // console.log(eu_array);

    // var data = {
    //     labels: [0, 0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 0.5],
    //     series: [eu_array],
    // }


    console.log(data);


	var options = {
	  showLine: false,
	  axisX: {
	    labelInterpolationFnc: function(value, index) {
	      return index % 13 === 0 ? 'W' + value : null;
	    }
	  }
	};

	var responsiveOptions = [
	  ['screen and (min-width: 640px)', {
	    axisX: {
	      labelInterpolationFnc: function(value, index) {
	        return index % 4 === 0 ? 'W' + value : null;
	      }
	    }
	  }]
	];

	new Chartist.Line('#scatter_digramm', data, options, responsiveOptions);


	var doughnutData = [
        {
            value: 300,
            color: "#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 50,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 100,
            color: "#b5b8cf",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];

    var doughnutOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        responsive: true,
    };


    var ctx1 = document.getElementById("pie_chart1").getContext("2d");
    var myNewChart = new Chart(ctx1).Doughnut(doughnutData, doughnutOptions);

    var ctx2 = document.getElementById("pie_chart2").getContext("2d");
    var myNewChart = new Chart(ctx2).Doughnut(doughnutData, doughnutOptions);

    var ctx3 = document.getElementById("pie_chart3").getContext("2d");
    var myNewChart = new Chart(ctx3).Doughnut(doughnutData, doughnutOptions);

    var ctx1 = document.getElementById("pie_chart4").getContext("2d");
    var myNewChart = new Chart(ctx1).Doughnut(doughnutData, doughnutOptions);

    var ctx2 = document.getElementById("pie_chart5").getContext("2d");
    var myNewChart = new Chart(ctx2).Doughnut(doughnutData, doughnutOptions);

    var ctx3 = document.getElementById("pie_chart6").getContext("2d");
    var myNewChart = new Chart(ctx3).Doughnut(doughnutData, doughnutOptions);



});







Template.customers_info.helpers({
    total_money: function () {
        var total_money = 0;
        Customers.find().fetch().forEach(function (customer) {
            total_money += customer.customer_money;
        });
        return total_money;
    },

    total_income: function () {
        var total_income = 0;
        Customers.find().fetch().forEach(function (customer) {
            total_income += customer.customer_period_income;
        });
        return total_income;
    },

    total_conservatism: function () {
        var total_conservatism = 0;
        Customers.find().fetch().forEach(function (customer) {
            total_conservatism += customer.customer_conservatism;
        });
        return parseFloat((total_conservatism / Customers.find().count()).toFixed(2)); ;
    },

    total_user_activity: function () {
        var total_user_activity = 0;
        Customers.find().fetch().forEach(function (customer) {
            total_user_activity += customer.customer_activity;
        });
        return Math.round(total_user_activity / Customers.find().count() * 100);
    },
});

