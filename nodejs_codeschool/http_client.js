var http = require('http');

var makeRequest = function(message)
{
	var options = { host:'localhost', port:8000, path:'/', method:'POST' };

	var request = http.request(options, function(resp){
		resp.on('data',function(data){
			console.log(data);
		});
	});

	request.write(message);
	request.end();
}

var message = "Sample message...";

exports = makeRequest;

