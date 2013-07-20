var http = require('http');
var https = require('https');
var events = require('events');
var url = require('url');

/*
SSL options:

var options = {
     key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
     cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};
*/
var createServer = function(opts,callback) {
     if (opts.ssl) {
          return https.createServer(opts,callback);
     } else {
          return http.createServer(callback);
     }
}

// http://nodejs.org/api/http.html#http_http_request_options_callback
var doRequest = function(opts,params,callback) {
     if (opts.ssl) {
          return https.request(params,callback);
     } else {
          return http.request(params,callback);
     }
}

function Proxy(opts,callback) {
     var self = this;

     if (opts==null) {
          opts = {port:80, ssl:false, ssl_client:false};
     }
     
     if (callback==null) {
          callback = function(){};
     }

     self.server = createServer(opts,function(req,res) {
          req.setEncoding('binary');
          
          var context = { request: req, response: response };

          // configure the client (proxy) request
          context.client_request_params = {
               host: req.headers.host.split(':')[0], 
               port: opts.port,
               method: req.method, 
               path: req.url, 
               headers: req.headers,
               agent: new http.Agent({ maxSockets: 128 })
          };

          callback(req,res);

          // emit client (proxy) request params
          // 3rd parameter is a 'default callback'....
          self.emit('client-request-params', context, function(context) {
               // make the request and attach it to the context
               context.client_request = doRequest(opts, context.client_request_params, function(client_response) {
                    // set binary encoding by default
                    client_response.setEncoding('binary');
                
                    // attach client (proxy) response to context
                    context.client_response = client_response;
                
                    // listen client (proxy) response data event
                    client_response.on('data', function(chunk) {
                         // emit client (proxy) response data event
                         self.emit('client-response-data', context, chunk, function(context, chunk){
                              // default callback
                              context.response.write(chunk, 'binary');
                        });
                    });
                
                     // listen client (proxy) response end event
                    client_response.on('end', function(){
                         // emit client (proxy) response end event
                         self.emit('client-response-end', context, function(context, end){
                              // default callback
                              context.response.end(end);
                         });                
                    }); 
               });
           
               // ignore client (proxy) request timeouts
               context.client_request.on('error', function(){});
           
               // listen server request data event
               req.on('data', function(chunk){
                    // emit server request data event
                    self.emit('request-data', context, chunk, function(context, chunk){
                         // default callback
                         context.client_request.write(chunk, 'binary');
                    });
               });
           
               // listen server request end event
               req.on('end', function(){
                    // emit server request end event
                    self.emit('request-end', context, function(context, end){
                         // default callback
                         context.client_request.end(end);
                    });
               });
          });
     });


     // calls last argument on first
     function call1(first, callback){
         return callback(first);
     }
     
     // calls last argument on first and second
     function call2(first, second, callback){
          return callback(first, second);
     }
          
     // wire default callback for client (proxy) request params
     self.on('client-request-params', call1);

     // wire default callback for client (proxy) response data event
     self.on('client-response-data', call2);

     // wire default callback for client (proxy) response end event
     self.on('client-response-end', call1);

     // wire default callback for server request data event
     self.on('request-data', call2);

     // wire default callback for server reques end event
     self.on('request-end', call1);

     // attach http server listen method this event emitter
     self.listen = function(){
          self.server.listen.apply(self.server, arguments);
     };
}

// extends events.EventEmitter
Proxy.prototype = Object.create(events.EventEmitter.prototype);
 
// is globally exported
module.exports = Proxy;

/*
var opts = {port:80, ssl:false, ssl_client:false};

var p = Proxy(opts,function(req,res) {

});

p.listen();
*/

