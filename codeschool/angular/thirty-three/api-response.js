angular.module('publicapi.transformers').factory('services.transformer.ApiResponse',function(){
	return function(data){
		return JSON.parse(data);
	}
});
