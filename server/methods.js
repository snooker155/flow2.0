function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}



// ////////////////////////////////////////////////

//       var main_function = function(id){

//         var game = Games.findOne({_id: id});
//         var total_people = 0;


//         for(var player in game.players){

//           if(Companies.findOne({owner: game.players[player].player._id})){


//             for(var region in game.regions){
//               for(var player in game.regions[region].players){
//                 game.regions[region].players[player].people -= 1;
//                 game.regions[region].players[player].share = game.regions[region].players[player].people / game.regions[region].people_all * 100;
//                 total_people += game.regions[region].people_all;
//               }
//             }

//             for(var player in game.players){
//               var people_of_player = 0;
//               for(var region in game.regions){
//                 if(game.regions[region].players[player]){
//                   people_of_player += game.regions[region].players[player].people;
//                 }
//               }
//               game.players[player].people = people_of_player;
//               game.players[player].share = people_of_player / total_people * 100;
//             }


//             var company = Companies.findOne({owner: game.players[player].player._id});
//             company.company_balance += Math.round(game.players[player].profit * game.players[player].people);
//             if (Employees.findOne({company_name: company.company_name})){
//               var employees_costs = 0;
//               var employees_exp = 0;
//               Employees.find({company_name: company.company_name}).forEach(function (employee) {
//                   employees_costs += employee.sum_of_department;
//                   employees_exp += employee.employee_level * employee.employee_number * 0.01;
//               });
//               company.company_balance -= employees_costs;

//               if ((company.company_experience + employees_exp) >= 100){
//                 Companies.update(company._id,{
//                   $set: {
//                     company_level: company.company_level+1,
//                     company_experience: 0,
//                   }
//                 });
//               }else{
//                 Companies.update(company._id,{
//                   $set: {
//                     company_experience: company.company_experience + employees_exp,
//                   }
//                 });
//               }
//             }

//             Companies.update(company._id,{
//               $set:{
//                 company_balance: company.company_balance,
//               }
//             });

//             Companies_balance_log.insert({
//               company_id: company._id,
//               company_balance: company.company_balance,
//               createdAt: new Date(),
//             });
//           }
//         }

//         for(var player in game.players){
//           if(game.players[player].share <= 0 || game.players[player].share >= 100){
//             Meteor.clearInterval(interval);
//           }
//         }


//         Games.update(id, {
//           $set:{
//             players: game.players,
//             regions: game.regions,
//             time_period: game.time_period++,
//           }
//         });

//       };

// ////////////////////////////////////////////////////





  Meteor.methods({




////////// User methods ///////////////


    deleteUser: function(id){
      Meteor.users.remove(id);
    },



////////// Game methods ///////////////

    
    // createGame: function(){

    //   var players = {};
    //   var regions = {};

    //   return Games.insert({
    //     players: players,
    //     regions: regions,
    //     owner: Meteor.userId(),
    //     username: Meteor.user().username,
    //     createdAt: new Date(),
    //     status: "process",
    //     time_period: 0,
    //   });

    // },



    addPlayer: function(){

      //console.log('adding new player');

      var game = Games.findOne({});
      var players_number = 0;
      for(var player in game.players){
        players_number++;
      }

      //console.log(players_number);

      var connections = {};

      game.players[Meteor.user().username] = {
        player: Meteor.user(),
        player_balance: 100000,
        player_color: rainbow(12, players_number+1),
        player_share: 0,
      };

      //console.log(this.connection.id);

      connections[this.connection.id] = {
        player: Meteor.user(),
      };

      Games.update(game._id, {
        $set: {
          players: game.players,
          connections: connections,
        }
      });

    },


    disconnectPlayer: function(connection){


      var game = Games.findOne({});

      var disc_player = game.connections[connection.id].player.username;

      for(var region in game.players[disc_player].regions){
        game.regions[region].region_color = "#eee";
      }

      delete game.players[disc_player];


      Games.update(game._id, {
        $set: {
          regions: game.regions,
          players: game.players,
        }
      });



    },


    addRegionToPlayer: function(game, region){
      if(game.players[Meteor.user().username].regions !== undefined){
        game.players[Meteor.user().username].regions[region] = {
          region_name: region,
          people: 500,
          price: 0,
          profit: 0,
          share: 0,
        };

        game.regions[region].players[Meteor.user().username] = game.players[Meteor.user().username];
      }else{
        var player_regions = {};

        player_regions[region] = {
          region_name: region,
          people: 500,
          price: 0,
          profit: 0,
          share: 0,
        };

        game.players[Meteor.user().username].regions = player_regions;

        game.regions[region].players[Meteor.user().username] = game.players[Meteor.user().username];
        game.regions[region].region_color = game.players[Meteor.user().username].player_color;

      }

      Games.update(game._id, {
        $set: {
          players: game.players,
          regions: game.regions,
        }
      });
    },



    // initGame: function(id){

    //   var interval = Meteor.setInterval(main_function(id), 1000)

    // },




    buyShare: function(game_id, region_name){
      var game = Games.findOne({_id: game_id});
      var price = 0;
      var total_people = 0;
      if(region_name){
        if(game.regions[region_name].players[Meteor.user().username]){
          price = game.regions[region_name].players[Meteor.user().username].price;
          game.regions[region_name].players[Meteor.user().username].people += 25;
          game.regions[region_name].players[Meteor.user().username].share = game.regions[region_name].players[Meteor.user().username].people / game.regions[region_name].people_all * 100;
          var people_of_player = 0;
          for(var region in game.regions){
            people_of_player += game.regions[region].players[Meteor.user().username].people;
            total_people += game.regions[region].people_all;
          }
          game.players[Meteor.user().username].people = people_of_player;
          game.players[Meteor.user().username].share = people_of_player / total_people * 100;
        }
      }else{
        price = game.players[Meteor.user().username].price;
        var people_of_player = 0;
        for(var region in game.regions){
          if(game.regions[region_name].players[Meteor.user().username]){
            game.regions[region].players[Meteor.user().username].people += 25;
            game.regions[region].players[Meteor.user().username].share = game.regions[region].players[Meteor.user().username].people / game.regions[region].people_all * 100;
            people_of_player += game.regions[region].players[Meteor.user().username].people;
          }
          total_people += game.regions[region].people_all;
        }
        game.players[Meteor.user().username].people = people_of_player;
        game.players[Meteor.user().username].share = people_of_player / total_people * 100;
      }

      Games.update(game_id, {
        $set:{
          players: game.players,
          regions: game.regions,
        }
      });

      company.company_balance -= price;
      
    },



});