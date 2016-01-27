Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});



// Default route
// You can use direct this.render('template')
// We use Router.go method because dashboard1 is our nested view in menu


Router.route('/', {

  // onBeforeAction: function() {
  //   var game = Games.findOne({game_name: "test"});
  //   if (!Session.get("game")) {
  //     Meteor.call('addPlayer', game);
  //     Session.set("game", game);
  //   } else {
  //     this.next();
  //   }
  // },


  action: function () {
    if(Meteor.userId()){
      var game = Games.findOne({game_name: "test"});
      if (!Session.get("game")) {
        Meteor.call('addPlayer', game, function(error, result){
            Session.set("game", game);
        });
      } else {
        this.render('gameScreen');
        this.layout('gameLayout');
      }
    }else{
      Router.go('/login');
    }
  },

});





//////////////  TEST ENV Routers  ///////////////////

Router.route('/admin', function(){
  if(Meteor.userId()){
    this.render('admin');
  }else{
    Router.go('/login');
  }
});


Router.route('/login', function(){
   this.render('login');
   this.layout('blankLayout');
});


Router.route('/register', function(){
   this.render('register');
   this.layout('blankLayout');
});

//
// Other pages routes
//
Router.route('/notFound', function () {
    this.render('notFound');
});




