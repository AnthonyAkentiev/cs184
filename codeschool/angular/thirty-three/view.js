angular.module('publicapi.controllers').controller('controllers.View',
	['$scope','$services.Api',
		function($scope,api){
			$scope.repos = api.getUserRepos("AnthonyAkentiev");
		}	
]);
