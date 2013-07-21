// Just a code for debugging 
var http = require('http');

var options = { 
     host:'www.google.com',
     port:80, 
     path:'index.html', 
     method:'GET' 
};

var request = http.request(options, function(resp){
     resp.on('data',function(data){
          console.log(data);
     })
});

request.end();

