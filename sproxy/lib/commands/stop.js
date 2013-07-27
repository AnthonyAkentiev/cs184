module.exports = function(program, env, callback){
    var path = require('path'), 
        fs = require('fs'),
        child_process = require('child_process');

    // Resolve paths
    var basepath = path.dirname(path.dirname(__dirname)),
        pid = !program.pid.indexOf('/') ? program.pid : path.resolve(basepath, program.pid);

    // Kill the process 
    
    fs.readFile(pid, function(err, pidn){
        if (err && err.code === 'ENOENT'){
            console.error('sproxy: stopping error: lock file doesn\'t exists (%s)', pid);
            process.exit(1);
        } else {
            var kill = child_process.spawn('/bin/kill', [pidn.toString('utf-8')]);
            kill.on('exit', function(code){
                if (code === 0){
                    fs.unlink(pid); 
                    console.log('sproxy: stopped');

                    // Run callback if any
                    if (callback) callback();
                    else process.exit(0);
                } else {
                    console.error('sproxy: stopping error: couldn\'t kill %s', pidn.toString('utf-8'));
                    process.exit(1);
                }
            });
             
        }
    });
};
