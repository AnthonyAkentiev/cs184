var myApp = angular.module('myApp',[]);

myApp.factory('Data',function(){
     return {message:'Some data...'};
});

myApp.filter('reverse',function(){
     return function(txt){
          return txt.split("").reverse().join("");
     };
});

// Using Data factory...
function FirstController($scope,Data) {
     $scope.data = Data;

}

// Using Data factory...
// And filter!
function SecondController($scope,Data) {
     $scope.data = Data;
}
