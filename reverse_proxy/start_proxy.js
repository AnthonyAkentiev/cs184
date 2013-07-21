var Proxy = require('./Proxy');
var jsdom = require('jsdom');
var jquery = require('jquery');

// helpers:
function is_html(request){
     return 'accept' in request.headers
          && request.headers['accept'].match(/text\/html/);
};

// determines if response is a 'found' redirect
function is_redirect(response){
    return response.statusCode === 302;
}

// determines if response is a 'temporary' redirect
function is_temporary(response){
    return response.statusCode === 307;
}
     
// determines if the client requested html content
function is_html(request){
     return 'accept' in request.headers
          && request.headers['accept'].match(/text\/html/);
};

// disables gzip encoding
function no_gzip(request){
    delete request.headers['accept-encoding'];
}

// attaches connection = close to the headers
function connection_close(request){
    request.headers.connection = 'close';
}
     
// rewrites the host + path headers
function rewrite_host_path(request, host, path){
     request.host = request.headers.host = host;
     request.path = request.headers.path = path;
     request.url = host + path;
}

// translates relative urls to absolute
function rel_to_abs(host, uri){
     // if there isn't something similar to an absolute url
     if (uri.indexOf('://') === -1){
          // attach slash if required
          host += uri.indexOf('/') === -1 ? '/' : '';
          // build an absolute url and return it
          return '/?u=' + host + uri;
     } else {
          // return it, its already absolute
          return '/?u=' + uri;
     }
}

// rewrites the location header
function fix_location(request){
     request.headers.location = rel_to_abs(request.headers.host, request.headers.location);
}
   
// copies the status code + location from one request to another
function copy_location(original, destination){
     destination.statusCode = original.statusCode;
     destination.setHeader('location', original.headers.location);
}

// dom rewriter (urls)
function rewrite_dom(html, current_url){
     // we must create a window object with jsdom,
     // feeding it with the html content
     var window = jsdom.jsdom(html, null, {
          FetchExternalResources: false,
          ProcessExternalResources: false,
          MutationEvents: false,
          QuerySelector: false
     }).createWindow();

     // apply jquery to this window
     var $ = jquery.create(window);

     // relative url rewriter for jquery's each method
     function rewrite_relative($, attr, host){
          return function(ix, el){
               var $el = $(el), uri = $el.attr(attr);
               $el.attr(attr, translate_to_proxy(host, uri));
          }
     }

     // not the way for production environments,
     // but we gonna rewrite everything that fetches
     // external resources or links to them
     $('a').each(rewrite_relative($, 'href', current_url));
     $('img').each(rewrite_relative($, 'src', current_url))
     $('link').each(rewrite_relative($, 'href', current_url));
     $('script').each(rewrite_relative($, 'src', current_url))

     // find the doctype
     var doctype = 'doctype' in window.document && window.document.doctype ?
     window.document.doctype : '';

     // we restringify the object
     return doctype + window.document.innerHTML;
}

// query string parser
function parseQuery(request){
     var path_parts = url.parse(request.path, true);

     // if we are requesting a proxied url
     if (Object.keys(path_parts.query) && path_parts.query.u){
          // extract proxied url parts
          var proxy_path_parts = url.parse(path_parts.query.u);
          // if there is a host
          if (Object.keys(proxy_path_parts) && proxy_path_parts.host){
               // fetch the host
               var host = proxy_path_parts.host;
               // fetch the path
               var path = proxy_path_parts.path;
               // return the parsed host and path
               return { host: host, path: path };
          }
     }
}

///////////////////////////////////////////////////////////////////////////

// this is a port to connect to 
var opts = {port:80, ssl:false, ssl_client:false};

var app = new Proxy(opts,function(req,res) {


});

// before the client request is made, we want
// to customize some headers
app.addListener('client-request-params', function(context, callback){
     var request = context.client_request_params,

     // if we've got query like ?host=yandex.ru&path=index.html
     query = parseQuery(request);

     console.log("Query: host=%s; path=%s",query.host, query.path);

     if (query){
          // remove gzip
          no_gzip(request);
          // attach 'connection close' header
          connection_close(request);
          // write 'host'
          rewrite_host_path(request, query.host, query.path);
     }

     // do default processing 
     callback(context);
});

/*
// when we got some data chunks from the proxy client
app.addSingleListener('client-response-data', function(context, chunk, callback){
     var request = context.request,
     response = context.response;

     // check if the client request html content
     if (is_html(request)){
          // check if buffer exists
          if (!('buffer' in context)){
               context.buffer = [];
          }

          // save it into the buffer
          context.buffer.push(chunk.toString('binary'));
     } else {
          // or write the chunk to the response
          response.write(chunk, 'binary');
     }

     // do default processing: it does context.response.write(chunk,'binary')
     //callback(context, chunk);
});

// when the proxy client response is finished
app.addSingleListener('client-response-end', function(context){
     var request = context.request,
     response = context.response,
     client_response = context.client_response;

     //if there is a buffer in the context
     if ('buffer' in context){
          var buffer = context.buffer.join('').toString('utf8'),
          current_url = 'http://' + request.headers.host;

          // parse the buffer as DOM and write the result to the response
          response.write(rewrite_dom(buffer, current_url).toString('binary'), 'binary');
     }
     else if (is_temporary(client_response) || is_redirect(client_response)){
          // if we are dealing with a HTTP 302 redirect
          // rewrite it to back to the proxy
          fix_location(client_response);
          copy_location(client_response, response);
     }
     // end proxy server response
     response.end();
});
*/

app.listen(8099);


