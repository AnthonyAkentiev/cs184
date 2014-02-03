var myApp = angular.module('twitterApp', []);

app.controller("AppCtrl", function($scope){
     $scope.loadMoreTweets = function(){
          alert('Load');
     }
});

app.directive("enter",function(){
     return function(scope,el,attr){
          // call Function that is passed to this directive. See attribute
          element.bind("mouseenter",function(){
               scope.$apply(attr.enter);
          });
     }
});
