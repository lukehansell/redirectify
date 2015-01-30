var transformTools = require('browserify-transform-tools');
var fs = require('fs');

module.exports = transformTools.makeStringTransform("redirectify", {},
  function (content, opts, done) {
    var file = opts.file;

    if(!process.env.REDIRECT_DIR
    && (!opts.config || !opts.config.dir)){
      return done(null, content);
    }
    
    var filePath = file.split('/');
    var fileName = filePath.pop();
    
    var redirect_dir = process.env.REDIRECT_DIR || opts.config.dir;
    filePath.push(redirect_dir);
    filePath.push(fileName);
    
    if(!fs.existsSync( filePath.join('/') )){
      return done(null, content);
    } 
    
    done(null, fs.readFileSync(filePath.join('/')));
    
  }
);