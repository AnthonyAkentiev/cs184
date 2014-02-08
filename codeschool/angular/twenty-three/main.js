var app = angular.module("app", []);

app.factory("game",function(){
     return {
          title: "StartCraft"
     };
});

app.controller("AppCtrl", function ($scope,game) {
     $scope.title = game.title;
});

