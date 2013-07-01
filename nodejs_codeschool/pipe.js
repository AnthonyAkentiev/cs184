// THIS is what pipe does!

var fs = require('fs');

var file = fs.createReadStream("icon.png");
var newFile = fs.createWriteStream("icon-new.png");

file.on('data', function(chunk) {
  var isOk = newFile.write(chunk);
  if( !isOk )
  {
     file.pause();
  }
});

newFile.on('drain',function()
{
     file.resume();        
});

file.on('end', function() {
  newFile.end();
});

