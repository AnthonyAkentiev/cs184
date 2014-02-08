var app = angular.module("app", []);

app.factory("game",function(){
     return {
          title: "StartCraft"
     };
});

/*
// You can define like this:

angular.injector(["app").invoke(function(game){
     alert(game.title);
});
*/

app.controller("AppCtrl", function ($scope,game,$injector) {
     // Or like this
     $injector.invoke(function(game){
          $scope.title = game.title;
          alert(game.title);
     });

});

