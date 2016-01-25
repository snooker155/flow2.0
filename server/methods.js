function get_random_color() {
  function c() {
    return Math.floor(Math.random()*256).toString(16)
  }
  return "#"+c()+c()+c();
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



    addPlayer: function(game){
      var regions = {};

      game.players[Meteor.user().username] = {
        player: Meteor.user(),
        regions: regions,
        balance: 100000,
        player_color: get_random_color(),
        share: 0,
      };

      Games.update(game._id, {
        $set: {
          players: game.players,
        }
      });

    },


    addRegionToPlayer: function(game, region){
      game.players[Meteor.user().username].regions[region.region_name] = {
        region_name: region.region_name,
        people: 0,
        price: 0,
        profit: 0,
        share: 0,
      };

      Games.update(game._id, {
        $set: {
          players: game.players,
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