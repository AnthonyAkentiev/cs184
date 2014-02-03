var myApp = angular.module('kidApp', []);

myApp.controller("ChoreCtrl",function($scope){
     $scope.logChore = function(chore){
         alert(chore + " is done"); 
     }
});

myApp.directive("kid",function(){
     return {
          // required because of multiple "instances" of this element
          scope:{
               done: "&"
          },

          restrict: "E",

          template: '<input type="text" ng-model="chore">' +
               '{{chore}}' + 
               '<div class="button" ng-click="done({chore:chore})">DONE</div>'     
          ,
     };
});

