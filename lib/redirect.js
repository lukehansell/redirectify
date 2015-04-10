var path = require('path');

module.exports = {
  toDeepFilePath: function(base, redirectDir, file){
    var filePath = path.relative(base, file);
    return path.join(base, redirectDir, filePath);
  },
  
  toNestedFilePath: function(redirectDir, file){
    var fileName = path.basename(file);
    var filePath = path.dirname(file);
    return path.join(filePath, redirectDir, fileName);
  },

  addPrefix: function(prefix, file){
    return path.join(path.dirname(file), prefix + path.basename(file));
  },

  addSuffix: function(suffix, file){
    var fileExtension = path.extname(file);
    return path.join(path.dirname(file), path.basename(file, fileExtension) + suffix + fileExtension);
  }
};
