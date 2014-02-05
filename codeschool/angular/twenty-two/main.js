var app = angular.module("app", []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/map/:country/:state/:city',
     {
      templateUrl: "app.html",

      controller:"AppCtrl",

      resolve:{
          // q is a 'promise' library
          app:function($q){
               var def = $q.defer();

               // return promis and fire event after 2seconds
               $timeout(function(){
                    def.resolve();
               }, 2000);

               return def.promise;
          }
      }
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
    });
   // add more ...
});

app.controller("AppCtrl", function ($scope,$q) {
     var def = $q.defer();

     // this will probably happen in future...
     def.promise
     .then(function(){
          alert('From the dark past!');
     })
     .then(function(){
          alert('And this one...');
     })

     // trigger!
     def.resolve();

     $scope.$on("$routeChangeError", function (event, current, previous, rejection) {
          console.log(event);
          console.log(current);
          console.log(previous);
          console.log(rejection);
     });
});

