var myApp = angular.module('kidApp', []);

myApp.controller("AppCtrl",function($scope){

});

myApp.directive("drink",function(){
     return {
          scope:{
               // this gets data from attribute
               flavor:"@"
          },

          template: "<div>{{flavor}}</div>",

          /*
          link: function(scope,elem,attrs){
               scope.flavor = attrs.flavor;
          }
          */
     };
});

