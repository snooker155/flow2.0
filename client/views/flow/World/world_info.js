var selected_region = new ReactiveVar(null);



Template.world_info.onRendered(function(){
	

	// var width = 600,
 //    height = 570,
 //    radius = Math.min(width, height) / 2;

	// var x = d3.scale.linear()
	//     .range([0, 2 * Math.PI]);

	// var y = d3.scale.sqrt()
	//     .range([0, radius]);

	// var color = d3.scale.category20c();

	// var svg = d3.select("#sunburst").append("svg")
	//     .attr("width", width)
	//     .attr("height", height)
	//     .append("g")
	//     .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 0) + ")");

	// var partition = d3.layout.partition()
	//     .sort(null)
	//     .value(function(d) { return 1; });

	// var arc = d3.svg.arc()
	//     .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
	//     .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
	//     .innerRadius(function(d) { return Math.max(0, y(d.y)); })
	//     .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

	// // Keep track of the node that is currently being displayed as the root.
	// var node;

	// d3.json("flare.json", function(error, root) {
	//   node = root;
	//   var path = svg.datum(root).selectAll("path")
	//       .data(partition.nodes)
 //          .enter().append("path")
	//       .attr("d", arc)
	//       .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
	//       .on("click", click)
	//       .each(stash);

	//   d3.selectAll("input").on("change", function change() {
	//     var value = this.value === "count"
	//         ? function() { return 1; }
	//         : function(d) { return d.size; };

	//     path
	//         .data(partition.value(value).nodes)
	//         .transition()
	//         .duration(1000)
	//         .attrTween("d", arcTweenData);
	//   });



 //      var text = g.append("text")
 //        .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
 //        .attr("x", function(d) { return y(d.y); })
 //        .attr("dx", "6") // margin
 //        .attr("dy", ".35em") // vertical-align
 //        .text(function(d) { return d.name; });



	//   function click(d) {
	//     node = d;
	//     path.transition()
	//       .duration(1000)
	//       .attrTween("d", arcTweenZoom(d));
	//   }
	// });

	// d3.select(self.frameElement).style("height", height + "px");

	// // Setup for switching data: stash the old values for transition.
	// function stash(d) {
	//   d.x0 = d.x;
	//   d.dx0 = d.dx;
	// }

	// // When switching data: interpolate the arcs in data space.
	// function arcTweenData(a, i) {
	//   var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
	//   function tween(t) {
	//     var b = oi(t);
	//     a.x0 = b.x;
	//     a.dx0 = b.dx;
	//     return arc(b);
	//   }
	//   if (i == 0) {
	//    // If we are on the first arc, adjust the x domain to match the root node
	//    // at the current zoom level. (We only need to do this once.)
	//     var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
	//     return function(t) {
	//       x.domain(xd(t));
	//       return tween(t);
	//     };
	//   } else {
	//     return tween;
	//   }
	// }

	// // When zooming: interpolate the scales.
	// function arcTweenZoom(d) {
	//   var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
	//       yd = d3.interpolate(y.domain(), [d.y, 1]),
	//       yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
	//   return function(d, i) {
	//     return i
	//         ? function(t) { return arc(d); }
	//         : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
	//   };
	// }

 //    function computeTextRotation(d) {
 //      return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
 //    }


var width = 500,
    height = 570,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);

var color = d3.scale.category20c();

var svg = d3.select("#sunburst").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });



var getSunburstData = function(){

	var game = Games.findOne({});
	var regions_state = [];

	var regions_state1 = {
		name: "World",
		children: regions_state,
	}

	for(var region in game.regions){
		var region_state = [];
		var free_people = 0;
		if(game.regions[region].players !== undefined){
			for(var player in game.regions[region].players){
				if(game.regions[region].players[player] !== undefined && game.players[player].regions[region].people !== 0){
					region_state.push({
						name: game.players[player].player.username,
						size: game.players[player].regions[region].people,
					});
				}
			}
			region_state.push({
				name: "Free people",
				size: game.regions[region].region_people - game.getCustomersInRegion(region),
			});
		}

		if(region_state[1]){
			regions_state.push({
				name: region,
				children: region_state,
			});
		}else{
			regions_state.push({
				name: region,
				size: game.regions[region].region_people,
			});
		}
	}
	return regions_state1;
}
  


  var g = svg.selectAll("g")
    .data(partition.nodes(getSunburstData()))
    .enter().append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
    .on("click", click);

  var text = g.append("text")
    .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
    .attr("x", function(d) { return y(d.y); })
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .text(function(d) { return d.name; });


  function click(d) {
  	if(d.name){
	  	if(d.name == "World"){
	  		selected_region.set(null);
	  	}else{
	  		selected_region.set(d.name);	
	  	}
  	}else{
  		selected_region.set(null);
  	}

    // fade out all text elements
    text.transition().attr("opacity", 0);

    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d))
      .each("end", function(e, i) {
          // check if the animated element's data e lies within the visible angle span given in d
          if (e.x >= d.x && e.x < (d.x + d.dx)) {
            // get a selection of the associated text element
            var arcText = d3.select(this.parentNode).select("text");
            // fade in the text element and recalculate positions
            arcText.transition().duration(750)
              .attr("opacity", 1)
              .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
              .attr("x", function(d) { return y(d.y); });
          }
      });
  }


d3.select(self.frameElement).style("height", height + "px");



//Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}



Tracker.autorun(function () {
	//console.log(getSunburstData());

  	var path = svg.selectAll("path")
     .data(partition.nodes(getSunburstData())).transition().duration(400).attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); });

});

});





///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



Template.world_info.helpers({
	players: function () {
		var game = Games.findOne({});
		var shares_arr = [];
        for(var player in game.players){
	        if(game.players[player].regions !== undefined){
		        shares_arr.push(game.players[player]);
	    	}
     	}
        return shares_arr;
	},

	regions: function () {
		var game = Games.findOne({});
		var regions_arr = [];
        for(var region in game.regions){
			regions_arr.push({
				region: game.regions[region],
				region_fullness_array: [game.getRegionFullness(region), 100-game.getRegionFullness(region)],
				region_fullness: 100 - game.getRegionFullness(region),
			});
     	}
        return regions_arr;
	},

	selected_region: function(){
		var game = Games.findOne({});
		if(selected_region.get() === null){
			return game.getWorldState();
		}else{
			return game.regions[selected_region.get()];
		}		
	},

	colours: function(){
		return ["#ccc", "#1ab394"];
	},
});