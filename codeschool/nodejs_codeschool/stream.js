var http = require('http');
var fs = require('fs');

var server = http.createServer();

function reqFunc(request,response)
{
     var newFile = fs.createWriteStream("output_file");
     var fileBytes = request.headers['content-length'];
     var uploadedBytes = 0;

     // write to file
     request.pipe(newFile);

     request.on('data',function(chunk){
          uploadedBytes+=chunk.length;
          var progress = ((uploadedBytes / fileBytes) * 100);
          response.write('Progress: ' + parseInt(progress,10) + "%\n" )
     });
}

server.on('request',reqFunc);
server.listen(8000);
