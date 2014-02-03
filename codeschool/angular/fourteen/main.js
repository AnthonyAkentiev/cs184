var myApp = angular.module('twitterApp', []);

myApp.directive("superhero",function(){
     return {
          // http://docs.angularjs.org/guide/directive

          // A is for attribute (default)
          // E is for element (you can embed <enter> element in HTML)
          // C is for class
          // M is for comment
          restrict: "E",

          // uncomment to separate "instances"
          //scope: {},

          controller: function($scope){
               $scope.abilities =[];

               this.addStrenght = function(){
                    $scope.abilities.push("strength"); 
               }
          },

          link: function(scope,element,attrs){
               element.bind("mouseenter",function(){
                    console.log(scope.abilities);
               });
          }
     };
});

myApp.directive("strength",function(){
     return {
          // nesting
          // this opens the access
          require: "superhero",

          restrict: "A",

          link:function(scope,element,attrs,superheroCtrl){
               superheroCtrl.addStrenght(); 
          }
     };
});
