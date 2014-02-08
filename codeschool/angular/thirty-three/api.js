angular.module('publicapi.services').factory('services.Api',[
	'$q','$http',
	//,'services.transformer.ApiResponse'
	
	function($q,$http){
		return {
			getUserRepos: function(login){
				// promise
				var deferred = $q.defer();

				$http({
					method:"GET",
					url: "https://api.github.com/users/" + login + "/repos"
					//transformResponse: apiTransformer
				}).
				success(function(data){
					deferred.resolve();
				});

				return deferred.promise;
			}
		};
	}
]);
