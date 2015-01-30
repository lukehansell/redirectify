var path = require('path');

var assert = require('assert');

var transformTools = require('browserify-transform-tools');

var redirectify = require('../lib/redirectify');

describe('redirectify', function(){
  var file;
  
  before(function(){
    file = path.resolve(__dirname, "fixtures/files/test.txt");
  });
  
  describe('without config or env var', function(){
    it('returns default content', function(done){
      transformTools.runTransform(redirectify, file, {}, function(err, transformed){
        assert.equal('test', transformed);
        done();
      });
    });
  });
  
  describe('from config', function(){
    describe('with existing sub folder file', function(){

      beforeEach(function(){
        var config = { dir: 'sub1' };
        redirectify.setConfig(config);
      });

      it('returns sub folder file content', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err, transformed){
          assert.equal('sub test', transformed);
          done();
        });
      });

      it('does not error', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err){
          assert.ok(!err);
          done();
        });
      });
    });

    describe('without existing file in subfolder', function(){
      beforeEach(function(){
        var config = { dir: 'sub2' };
        redirectify.setConfig(config);
      });

      it('returns the original files content', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err, transformed){
          assert.equal('test', transformed);
          done();
        });
      });

      it('does not error', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err){
          assert.ok(!err);
          done();
        });
      });

    });

    describe('without existing sub folder', function(){
      beforeEach(function(){
        var config = { dir: 'sub3' };
        redirectify.setConfig(config);
      });

      it('returns the original files content', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err, transformed){
          assert.equal('test', transformed);
          done();
        });
      });

      it('does not error', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err, transformed){
          assert.ok(!err);
          done();
        });
      });
    });
  });
  
  describe('from environment variable', function(){
    describe('can use env var', function(){
      beforeEach(function(){
        var config = {};
        redirectify.setConfig(config);
        process.env['REDIRECT_DIR'] = 'sub1';
      });
      it('returns sub folder file content', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err, transformed){
          assert.equal('sub test', transformed);
          done();
        });
      });

      it('does not error', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err){
          assert.ok(!err);
          done();
        });
      });
    });
  });
});