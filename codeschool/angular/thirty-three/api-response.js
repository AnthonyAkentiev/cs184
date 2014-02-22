angular.module('publicapi.transformers').factory('services.transformer.ApiResponse',function(){
	return function(data){
          data = JSON.parse(data);

          if(data.length)
          {
               data = _.map(data,function(repo){
                    return {userName:repo.full_name, gitUrl: repo.git_url};
               });
          }

          console.log('-->Data: ');
          console.log(data);
          return data;
	}
});
