var myApp = angular.module('myApp',[]);

myApp.factory('Data',function(){
     return {message:'Some data...'};
});

// Using Data factory...
function FirstController($scope,Data) {
     $scope.data = Data;
}

function SecondController($scope) {
     //$scope.data = {message:'Second'};
}
