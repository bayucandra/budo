var rimraf = require('rimraf')
var log = require('bole')('mystc')
var tmp = require('tmp')

module.exports = function(cb) {
    tmp.dir({ 
        mode: '0755', 
        prefix: 'mystc-' 
    }, 
      function(err, filepath) {
        if (!err) {
            process.on('exit', remove)
            process.on('SIGINT', exit)
            process.on('uncaughtException', exit)
            log.debug('temp directory created at', filepath)
        }

        cb(err, filepath)

        function remove(err) {
            try {
              rimraf.sync(filepath)
            } catch(e) {
              rimraf.sync(filepath)
            }
            if (err) 
                console.error(err.stack)
        }
        
        function exit(err) {
            if (err)
                console.error(err.stack)
            process.exit()
        }
    })

}