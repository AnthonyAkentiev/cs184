var Proxy = require('./Proxy');

// this is a port to connect to 
var opts = {port:80, ssl:false, ssl_client:false};

var app = new Proxy(opts,function(req,res) {


});

app.listen(8099);


