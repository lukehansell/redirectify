var path = require('path');

var assert = require('assert');

var transformTools = require('browserify-transform-tools');

var redirectify = require('../');

describe('redirectify', function(){
  var file;
  var deepfile;
  
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
    describe('using dir', function(){
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
      
      describe('and prefix', function(){
        beforeEach(function(){
          var config = { dir: 'sub1', prefix: 'prefix_' };
          redirectify.setConfig(config);
        });

        it('returns sub folder file content', function(done){
          transformTools.runTransform(redirectify, file, {}, function(err, transformed){
            assert.equal('sub prefix test', transformed);
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
      
      describe('and suffix', function(){
        beforeEach(function(){
          var config = { dir: 'sub1', suffix: '_suffix' };
          redirectify.setConfig(config);
        });

        it('returns sub folder file content', function(done){
          transformTools.runTransform(redirectify, file, {}, function(err, transformed){
            assert.equal('sub suffix test', transformed);
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
      
      describe('and prefix and suffix', function(){
        beforeEach(function(){
          var config = { dir: 'sub1', prefix: 'prefix_', suffix: '_suffix' };
          redirectify.setConfig(config);
        });

        it('returns sub folder file content', function(done){
          transformTools.runTransform(redirectify, file, {}, function(err, transformed){
            assert.equal('sub prefix suffix test', transformed);
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
    
    describe('with base dir', function(){
      beforeEach(function(){
        deepfile = path.resolve(__dirname, "fixtures/files/sub1/deepsub/test.txt");
        var config = { dir: '../sub2', base: path.resolve(__dirname, "fixtures/files/sub1") };
        redirectify.setConfig(config);
      });

      it('returns deep sub folder file content', function(done){
        transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
          assert.equal('base test', transformed);
          done();
        });
      });

      it('does not error', function(done){
        transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
          assert.ok(!err);
          done();
        });
      });
      
      describe('and prefix', function(){
        beforeEach(function(){
          deepfile = path.resolve(__dirname, "fixtures/files/sub1/deepsub/test.txt");
          var config = { dir: '../sub2', base: path.resolve(__dirname, "fixtures/files/sub1"), prefix: 'prefix_' };
          redirectify.setConfig(config);
        });

        it('returns deep sub folder file content', function(done){
          transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
            assert.equal('base prefix test', transformed);
            done();
          });
        });

        it('does not error', function(done){
          transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
            assert.ok(!err);
            done();
          });
        });
      });
      
      describe('and suffix', function(){
        beforeEach(function(){
          deepfile = path.resolve(__dirname, "fixtures/files/sub1/deepsub/test.txt");
          var config = { dir: '../sub2', base: path.resolve(__dirname, "fixtures/files/sub1"), suffix: '_suffix' };
          redirectify.setConfig(config);
        });

        it('returns deep sub folder file content', function(done){
          transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
            assert.equal('base suffix test', transformed);
            done();
          });
        });

        it('does not error', function(done){
          transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
            assert.ok(!err);
            done();
          });
        });
      });
      
      describe('and prefix and suffix', function(){
        beforeEach(function(){
          deepfile = path.resolve(__dirname, "fixtures/files/sub1/deepsub/test.txt");
          var config = { dir: '../sub2', base: path.resolve(__dirname, "fixtures/files/sub1"), prefix: 'prefix_', suffix: '_suffix' };
          redirectify.setConfig(config);
        });

        it('returns deep sub folder file content', function(done){
          transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
            assert.equal('base prefix suffix test', transformed);
            done();
          });
        });

        it('does not error', function(done){
          transformTools.runTransform(redirectify, deepfile, {}, function(err, transformed){
            assert.ok(!err);
            done();
          });
        });
      });
    });
    
    describe('with prefix', function(){
      beforeEach(function(){
        var config = { prefix: 'prefix_'};
        redirectify.setConfig(config);
      });
      
      it('returns content of prefixed file', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err, transformed){
          assert.equal('PREFIX TEST', transformed);
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
    
    describe('with suffix', function(){
      beforeEach(function(){
        var config = { suffix: '_suffix' };
        redirectify.setConfig(config);
      });

      it('returns content of suffixed file', function(done){
        transformTools.runTransform(redirectify, file, {}, function(err, transformed){
          assert.equal('SUFFIX TEST', transformed);
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