var express = require('express');
var http = require('http');
var url = require('url');

var app = express();

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
               response.end();
          });
     });

     request.end();
});

app.listen(8089);
