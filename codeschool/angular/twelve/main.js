var myApp = angular.module('behaviour', []);

myApp.directive("enter",function(){
     return {
          // http://docs.angularjs.org/guide/directive

          // A is for attribute (default)
          // E is for element (you can embed <enter> element in HTML)
          // C is for class
          // M is for comment
          restrict: "A",
          link: function(scope,element,attrs){
              element.bind("mouseenter",function(){
                    console.log("i am inside of you");
                    element.addClass(attrs.enter);
              });
          }
     };
})

myApp.directive("leave",function(){
     return {
          restrict: "A",
          link: function(scope,element){
              element.bind("mouseleave",function(){
                    console.log("i am outside of you");
                    element.removeClass("panel");
              });
          }
     };
})
