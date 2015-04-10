var transformTools = require('browserify-transform-tools');
var fs = require('fs');
var path = require('path');
var ConfigHelper = require('./configHelper');

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
        redirectPath = _makeDeepFilePath(base, redirectDir, file);
      } else {
        redirectPath = _makeFilePath(redirectDir, file);
      }
    }

    if(prefix) redirectPath = _addPrefix(prefix, redirectPath);
    if(suffix) redirectPath = _addSuffix(suffix, redirectPath);
    
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

var _makeDeepFilePath = function(base, redirectDir, file){
  var filePath = path.relative(base, file);
  return path.resolve(base, redirectDir, filePath);
};

var _makeFilePath = function(redirectDir, file){
  var fileName = path.basename(file);
  var filePath = path.dirname(file);
  return path.resolve(filePath, redirectDir, fileName);
};

var _addPrefix = function(prefix, file){
  return path.resolve(path.dirname(file), prefix + path.basename(file));
};

var _addSuffix = function(suffix, file){
  var fileExtension = path.extname(file);
  var file = path.resolve(path.dirname(file), path.basename(file, fileExtension) + suffix + fileExtension);
  return file;
}