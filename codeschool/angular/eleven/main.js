var myApp = angular.module('behaviour', []);

myApp.directive("enter",function(){
     return {
          // http://docs.angularjs.org/guide/directive

          // A is for attribute (default)
          // E is for element (you can embed <enter> element in HTML)
          // C is for class
          // M is for comment
          restrict: "A",

          link: function(scope,element){
              element.bind("mouseenter",function(){
                    console.log("i am inside of you");
              });
          }
     };
})
