var express = require('express');
var articleProvider = require('./article-provider-mem.js').ArticleProvider;

var app = express();
var filesys = require('fs');
var logFile = 'requests.log';

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

var articleProvider = new ArticleProvider();

// On HTTP GET
app.get('/',
     function(req,res)
     {
          res.redirect('/blog');
     }
);

app.get('/blog', 
     function(req,res)
     {
          articleProvider.findAll(
               // callback 
               function(error,docs)
               {
		    //var data = 'Request for document ' + req.params.document + ' for URL: ' + req.url + '\n';
		    //filesys.appendFile( logFile, data );
       		    //console.log( 'Retrieving docs: ' + docs.length );
                    
		    //res.send(docs);
		
		    res.render( 'index.jade', 
 		     	{ pageTitle:'Blog', articles: docs }
	            );
               }
          );
     }
);

app.get('/blog/new',
     function(req,res)
     {
          res.render( 'blog_new.jade', { pageTitle:'New post' } );
     }	
);

app.post('/blog/new',
     function(req,res)
     {
          articleProvider.save( 
		{title:req.param('title') , body:req.param('body') }, 
		function(err,doc)
		{
		     // TODO: error page
		     res.redirect('/');
		}  
          ); 
     }
);

app.listen(8000);

