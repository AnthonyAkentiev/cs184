var app = angular.module("app", []);

app.controller("AppCtrl",function($scope){
     this.random = Math.random();
});

// This will allow TRUE-DOM in index.html
app.directive("app",function(){
     return {
          // restrict to Class
          restrict: "C",

          controller: "AppCtrl as app"
     };
});

angular.bootstrap(document.getElementById("container"), ["app"]);


