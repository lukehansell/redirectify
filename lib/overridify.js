var transformTools = require('browserify-transform-tools');
var fs = require('fs');

module.exports = transformTools.makeStringTransform("overridify", {},
  function (content, transformOptions, done) {
    var file = transformOptions.file;
    
    if(!transformOptions.config || (transformOptions.config && !transformOptions.config.dir)){
      return done(null, content);
    }
    
    var filePath = file.split('/');
    var fileName = filePath.pop();
    
    filePath.push(transformOptions.config.dir);
    filePath.push(fileName);
    
    if(!fs.existsSync( filePath.join('/') )){
      return done(null, content);
    } 
    
    done(null, fs.readFileSync(filePath.join('/')));
    
  }
);