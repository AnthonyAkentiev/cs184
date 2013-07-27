var log = exports.log = function(client, method, url, message){
    if (process.env.SPROXY_OPLOG){
        var now = (new Date).toISOString();
        console.log("%s - %s [%s] %s - %s", now, client, method, url, message);
    }
};

var errlog = exports.errlog = function(client, method, url, message){
    var now = (new Date).toISOString(); 
    console.error("%s - %s [%s] %s - %s", now, client, method, url, message);
};
