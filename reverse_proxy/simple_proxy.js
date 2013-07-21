/// Use like this: http://ec2-54-218-98-194.us-west-2.compute.amazonaws.com:8089/pages/navalny.livejournal.com

var express = require('express');
var http = require('http');
var url = require('url');

var app = express();

// determines if response is a 'found' redirect
function is_redirect(response){
    return response.statusCode === 302;
}

// determines if response is a 'temporary' redirect
function is_temporary(response){
    return response.statusCode === 307;
}

app.get('/pages/:page',function(req,response){
     var page = "http://" + req.params.page;
     var parts = url.parse(page,false,true);

     console.log( "Requested page is: %s", page );

     //split into host and path 

     var options = { 
          host:parts["host"],
          port:80, 
          path:parts["pathname"], 
          method:'GET',
          headers:{
               'Content-Type': 'text/plain; charset=utf-8'
          }
     };

     var request = http.request(options, function(resp){
          resp.on('data',function(data){
               response.write(data);
          });

          resp.on('end',function(){
               if(is_redirect(resp) || is_temporary(resp)){
                    console.log("-->REDIRECT to %s", resp.headers.location );
               }
               response.end();
          });
     });

     request.end();
});

app.listen(8089);
