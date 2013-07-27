module.exports = function(program, env){
    var path = require('path'), 
        fs = require('fs'),
        child_process = require('child_process');

    // Resolve paths
    var basepath = path.dirname(path.dirname(__dirname)),
        proxy = path.resolve(basepath, './lib/proxy.js'),
        log = !program.log.indexOf('/') ? program.log : path.resolve(basepath, program.log),
        errlog = !program.errlog.indexOf('/') ? program.errlog : path.resolve(basepath, program.errlog),
        pid = !program.pid.indexOf('/') ? program.pid : path.resolve(basepath, program.pid);

    // Set ENV
    process.env.SPROXY_PORT = program.port;
    process.env.SPROXY_FILTERS = program.filters;
    process.env.SPROXY_FORK = !!(program.fork)+0;
    process.env.SPROXY_OPLOG = !!(program.oplog)+0;

    fs.stat(pid, function(err){
        if (err && err.code === 'ENOENT'){
            // Run
            console.log("sproxy: started, listening on port %s", program.port);

            if (program.fork){
                // Daemonize
                fs.open(log, 'a', function(err, logfd){
                    if (err) throw err;
                    fs.open(errlog, 'a', function(err, errlogfd){
                        if (err) throw err;
                        var daemon = child_process.spawn(proxy, [], {
                            "env": process.env,
                            "stdio": ['ignore', logfd, errlogfd],
                            "detached": true 
                        });
                        daemon.on('error', function(err){
                            console.error('sproxy: starting error: %s', err.message);
                            process.exit(1);
                        });
                        fs.writeFileSync(pid, daemon.pid, 'utf-8');
                        daemon.unref();
                        process.exit(0);
                    });
                });
            } else {
                require('../proxy');
            }
        } else {
            console.log('sproxy: starting error: lock file exists (%s)', pid);
            process.exit(1);
        }
    });
};
