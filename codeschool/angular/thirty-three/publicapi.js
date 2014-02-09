angular.module('publicapi.controllers',[]);
angular.module('publicapi.services',[]);
angular.module('publicapi.transformers',['angular-underscore']);

angular.module('publicapi',
	[
		'publicapi.controllers',
		'publicapi.services',
		'publicapi.transformers'
	]
);
