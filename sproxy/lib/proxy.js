#!/usr/bin/env node

var http = require('http'),
    zlib = require('zlib');

var log = require('./util').log,
    errlog = require('./util').errlog,
    util = require('util');

var HTTP_PORT = process.env.SPROXY_HTTP_PORT || 8080;
var FILTERS = process.env.SPROXY_FILTERS ?
    process.env.SPROXY_FILTERS.split(/,\s?/) : [];

// WriteStream
var Stream = require('stream').Stream;
var WriteStream = (function(superclass){
    util.inherits(WriteStream, superclass);

    function WriteStream(){ 
        superclass.call(this);
        this.writable = true;
    }

    WriteStream.prototype.write = function(chunk){
        return this.emit('data', chunk);
    };

    WriteStream.prototype.end = function(){
        return this.emit('end');
    };

    return WriteStream;
})(Stream);

var decoder = function(type){
    switch (type){
        case 'gzip': return zlib.createGunzip(); break;
        case 'deflate': return zlib.createInflate(); break;
        default: return new WriteStream; 
    }   
};  

var encoder = function(type){
    switch (type){
        case 'gzip': return zlib.createGzip(); break;
        case 'deflate': return zlib.createDeflate(); break;
        default: return new WriteStream; 
    }   
};


// Proxy handler
var server = exports.server = http.createServer(function(serverRequest, serverResponse){
    log(serverRequest.connection.remoteAddress, serverRequest.method,
        serverRequest.url, "Retrieving content");

    var requestOpts = { 
        host: serverRequest.headers.host,
        method: serverRequest.method, 
        path: serverRequest.url, 
        headers: serverRequest.headers
    };   

    var clientRequest = http.request(requestOpts, function(clientResponse){
        var enctype = clientResponse.headers['content-encoding'];
        delete clientResponse.headers['content-length'];
        serverResponse.writeHead(clientResponse.statusCode, clientResponse.headers);

        log(serverRequest.connection.remoteAddress, serverRequest.method,
            serverRequest.url, "Serving content (status: " + clientResponse.statusCode 
                + ", encoding: " + (enctype || "none") + ")");

        var decode = decoder(enctype), encode = encoder(enctype);
        
        clientResponse.pipe(decode)
            .pipe(encode).pipe(serverResponse);
    }); 

    clientRequest.on('error', function(e){
        errlog(serverRequest.connection.remoteAddress, serverRequest.method,
            serverRequest.url, "Error retrieving content (message: " + e.message + ")");

        serverResponse.writeHead(502, 'Proxy Error');
        serverResponse.end();
    });

    serverRequest.pipe(clientRequest);
}).listen(HTTP_PORT);
