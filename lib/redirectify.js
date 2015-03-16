var transformTools = require('browserify-transform-tools');
var fs = require('fs');
var path = require('path');

module.exports = transformTools.makeStringTransform("redirectify", {},
  function (content, opts, done) {
    var file = opts.file;
    var redirect_dir;
    var base;
    var filePath;
    var fileName;
    var redirectPath;

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

    base = opts.opts && opts.opts.base ? opts.opts.base : opts.config && opts.config.base ? opts.config.base : null;

    if(!base) {
      fileName = path.basename(file);
      filePath = path.dirname(file);
      redirectPath = path.resolve(filePath, redirect_dir, fileName);
    } else {
      filePath = path.relative(base, file);
      redirectPath = path.resolve(base, redirect_dir, filePath);
    }

      fs.exists(redirectPath, function (exists) {
      if(!exists) {
        return done(null, content);
      } else {
        fs.readFile(redirectPath, function(err, data) {
          if(err) throw err;
          done(null, data);
        })
      }
    });
  }
);
