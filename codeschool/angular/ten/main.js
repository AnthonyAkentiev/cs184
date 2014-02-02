var myApp = angular.module('superhero', []);

myApp.directive("superman",function(){
     return {
          // A is for anchor
          // E is for element
          // C is for class
          // M is for comment
          restrict: "A",
          link: function(){
               alert('I am working');
          }
     };
})
