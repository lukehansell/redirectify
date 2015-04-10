var assert = require('assert');
var path = require('path');
var redirect = require('../../lib/redirect');

describe('redirect', function(){
  describe('toDeepFilePath', function(){
    it('returns deep file location', function(){
      var actual = redirect.toDeepFilePath('foo/bar/', '../baz', 'foo/bar/file.js');
      assert.equal(actual, 'foo/baz/file.js');  
    });
    it('returns nested deep file location', function(){
      var actual = redirect.toDeepFilePath('a/b/', '../c', 'a/b/d/e/f/g/h/i');
      assert.equal(actual, 'a/c/d/e/f/g/h/i');
    });
  });
  
  describe('toNestedFilePath', function(){
    it('returns nested file location', function(){
      var actual = redirect.toNestedFilePath('bar', 'foo/baz');
      assert.equal(actual, 'foo/bar/baz');
    });
  });
  
  describe('addPrefix', function(){
    it('returns prefixed file location', function(){
      var actual = redirect.addPrefix('prefix-', 'foo/bar.js');
      assert.equal(actual, 'foo/prefix-bar.js');
    });
  });
  
  describe('addSuffix', function(){
    it('returns suffixed file location', function(){
      var actual = redirect.addSuffix('-suffix', 'foo/bar.js');
      assert.equal(actual, 'foo/bar-suffix.js');
    });
  });
});