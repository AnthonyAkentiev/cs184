var myApp = angular.module('myApp', []);

myApp.factory('Avengers', function () {
     var Avengers = {};

     Avengers.cast = [
          {
               name: 'Robert Downey Jr.',
               character: 'Tony Stark / Iron Man'
          },

          {
               name: 'Chris Evans',
               character: 'Steve Rogers / Captain America'
          }
     ];

     return Avengers;
});

function AvengersCtrl($scope, Avengers) {
     $scope.avengers = Avengers;
}
