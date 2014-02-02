var myApp = angular.module('myApp',[]);

myApp.factory('Data',function(){
     return {message:'Some data...'};
});

// Using Data factory...
function FirstController($scope,Data) {
     $scope.data = Data;

}

// Using Data factory...
function SecondController($scope,Data) {
     $scope.data = Data;

     $scope.reversedMessage = function(msg){
          return msg.split("").reverse().join("");
     };
}
