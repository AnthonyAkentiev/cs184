var myApp = angular.module('myApp',[]);

myApp.factory('Data',function(){
     return {message:'Some data...'};
});

function FirstController($scope,Data) {
     //$scope.data = {message:'Hello'};
}

function SecondController($scope) {
     //$scope.data = {message:'Second'};
}
