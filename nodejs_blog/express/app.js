var express = require('express');
var articleProvide = require('./article-provider-mem.js').ArticleProvide;

var app = module.exports = express.createServer();

app.configure(
     function()
     {
          app.set('views', __dirname + '/views');
          app.set('view engine', 'Jade');

          app.use(express.bodyParser());
          app.use(express.methodOverride());

          app.use(require('stylus').middleware({src:__dirname + '/public' }));
          app.use(app.router);
          app.use(express.static(__dirname + '/public'));
     }
);

app.configure('development',
     function()
     {
          app.use(express.errorHandler({dumpExceptions:true, showStack:true}));
     }     
);

app.configure('production',
     function()
     {
          app.use(express.errorHandler());
     }     
);

var articleProvide = new ArticleProvide();

// On HTTP GET
app.get('/', 
     function(req,res)
     {
          articleProvide.findAll(
               // callback 
               function(error,docs)
               {
                    res.send(docs);
               }
          );
     }
);

app.listen(8000);

