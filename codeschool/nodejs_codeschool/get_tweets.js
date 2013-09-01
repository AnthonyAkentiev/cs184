var request = require('request');
var url = require('url');

app.get('/tweets/:username',function(req,response){
	var username = req.params.username;
	
	options = 
	{
		protocol:"http",
		host:"api.twitter".
		pathname:"/1/statuses/user_timeline.json",
		query: { screen_name: username, count:10 }
	};

	var twitterUrl = url.format(options);

	// use prettyjson to render output on client side like this:
	// http://server:8080/tweets/anthonyakentiev | prettyjson
	request(twitterUrl).pipe(response);
});
