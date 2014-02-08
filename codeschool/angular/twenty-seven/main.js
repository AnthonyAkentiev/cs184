var app = angular.module("app", []);

app.controller("AppCtrl",function($scope){

});


app.directive("country",function(){
     return {
          restrict: "E",

          controller: function(){
               this.makeAnnouncment = function(message){
                    console.log('-->Ann: ' + message);
               }
          }
     };
});

app.directive("city",function(){
     return {
          restrict: "E",

          require: "^country",

          link: function(scope,element,attrs,countryCtrl){
               countryCtrl.makeAnnouncment("this city rocks");
          }
     };
});

app.directive("state",function(){
     return {
          restrict: "E",

          link: function(scope,element,attrs){

          }
     };
});
