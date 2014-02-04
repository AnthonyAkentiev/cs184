var app = angular.module("phoneApp", []);

app.controller("AppCtrl", function ($scope) {

});

app.directive("panel", function() {
  return {
    restrict: "E",

    // this flag will cause Button to appear inside of out panell!
    transclude: true,

    template: '<div class="panel" ng-transclude>This is a panel component</div>'
  };
});
