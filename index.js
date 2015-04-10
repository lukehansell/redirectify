var transformTools = require('browserify-transform-tools');
var fs = require('fs');
var ConfigHelper = require('./lib/config-helper');

var redirect = require('./lib/redirect');

module.exports = transformTools.makeStringTransform("redirectify", {},
  function (content, opts, done) {
    var file = opts.file;
    var redirectPath = file;

    var configHelper = new ConfigHelper(opts);

    var redirectDir = (process.env.REDIRECT_DIR) ? process.env.REDIRECT_DIR : configHelper.getVar('dir');
    var prefix = configHelper.getVar('prefix');
    var suffix = configHelper.getVar('suffix');

    if(!(redirectDir || prefix || suffix)){
      return done(null, content);
    }

    var base = configHelper.getVar('base');

    if(redirectDir){
      if(base) {
        redirectPath = redirect.toDeepFilePath(base, redirectDir, file);
      } else {
        redirectPath = redirect.toNestedFilePath(redirectDir, file);
      }
    }

    if(prefix) redirectPath = redirect.addPrefix(prefix, redirectPath);
    if(suffix) redirectPath = redirect.addSuffix(suffix, redirectPath);

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