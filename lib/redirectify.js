var transformTools = require('browserify-transform-tools');
var fs = require('fs');

module.exports = transformTools.makeStringTransform("redirectify", {},
  function (content, opts, done) {
    var file = opts.file;
    var redirect_dir;

    if (process.env.REDIRECT_DIR) {
      redirect_dir = process.env.REDIRECT_DIR;
    } else if (opts.opts && opts.opts.dir) {
      redirect_dir = opts.opts.dir;
    } else if (opts.config && opts.config.dir){
      redirect_dir = opts.config.dir;
    }

    if(!redirect_dir){
      return done(null, content);
    }

    var filePath = file.split('/');
    var fileName = filePath.pop();

    filePath.push(redirect_dir);
    filePath.push(fileName);

    if(!fs.existsSync( filePath.join('/') )){
      return done(null, content);
    }

    done(null, fs.readFileSync(filePath.join('/')));

  }
);