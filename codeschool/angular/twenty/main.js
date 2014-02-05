var app = angular.module("app", []);

app.directive("dumbPassword", function () {
  var validElement = angular.element('<div>{{model.input}}</div>');

  var link = function (scope, element) {
    scope.$watch("model.input", function (value) {
      if(value === "password") {
        console.log(element);
        // check this out! we are not searching for element
        // using 'children', we have a REFERENCE here! Cool!
        validElement.toggleClass("alert-box alert");
      }
    });
  };

  return {
    restrict: "E",

    replace: true,

    // Use this to load template from separate file...
    // templateUrl: 

    template: '<div><input type="text" ng-model="model.input">',

    // This will add element at a 'runtime' and make 'validElement' REFERENCE to DOM element!
    compile: function (tElem) {
      tElem.append(validElement);
      return link;
    }
  };
});
