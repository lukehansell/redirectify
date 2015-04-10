function ConfigHelper(opts){
  if(!opts) opts = {};
  this.opts = opts;
}

ConfigHelper.prototype.getVar = function(varName){
  return this.opts.opts && this.opts.opts[varName] ? this.opts.opts[varName] : this.opts.config && this.opts.config[varName] ? this.opts.config[varName] : null
};

module.exports = ConfigHelper;