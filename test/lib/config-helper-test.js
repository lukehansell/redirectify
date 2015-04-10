var assert = require('assert');
var ConfigHelper = require('../../lib/config-helper');

describe('config-helper', function(){

  it('can be required without erroring', function(){
    assert.doesNotThrow(require('../../lib/config-helper'));
  });

  describe('getVar', function(){
    describe('with opts', function(){
      beforeEach(function(){
        this.configHelper = new ConfigHelper({opts: {foo: 'bar'}});
      });
      
      it('returns value from opts', function(){
        assert.equal(this.configHelper.getVar('foo'), 'bar');
      });
    });
    
    describe('with config', function(){
      beforeEach(function(){
        this.configHelper = new ConfigHelper({config: {foo: 'bar'}});
      });
      
      it('returns value from config', function(){
        assert.equal(this.configHelper.getVar('foo'), 'bar');
      });
    });
    
    describe('with opts and config', function(){
      beforeEach(function(){
        this.configHelper = new ConfigHelper({opts: {foo: 'bar'}, config: {foo: 'baz'}});
      });
      
      it('returns value from opts', function(){
        assert.equal(this.configHelper.getVar('foo'), 'bar');
      });
    });
    
    describe('without opts or config', function(){
      beforeEach(function(){
        this.configHelper = new ConfigHelper();
      });
      
      it('returns null', function(){
        assert.equal(this.configHelper.getVar('foo'), null);
      });
    });
  });
});