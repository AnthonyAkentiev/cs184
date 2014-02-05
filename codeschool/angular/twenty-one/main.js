var app = angular.module("app", []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/map/:country/:state/:city',
     {
      templateUrl: "app.html",

      controller:"AppCtrl"
    })
    .when('pizza',{
       template: 'Yum!!!'
    })
    .otherwise({
       redirectTo: function(routeParams,path,search){
          console.log(routeParams);
          console.log(path);
          console.log(search);
          return '/';
       }
    })
   // add more ...
});

app.controller("AppCtrl", function ($scope,$route,$routeParams) {
  /*
  $route.routes["/"] = {

  };
  */

  $scope.model = {
    // this will be passed to app.html template
    //message: "This is my app"
    message:  $routeParams.country + ", " + $routeParams.city
  };
});
