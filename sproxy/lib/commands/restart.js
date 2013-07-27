module.exports = function(program, env){
    var stop = require('./stop'),
        start = require('./start');

    // Do a stop/start chain
    stop(program, env, function(){
        // Forces fork
        program.fork = true;
        start(program);
    });
};
