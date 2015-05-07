'use strict';
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var broccoli = require('broccoli');
var renameFiles = require('./');

it('should exist under the new name', function () {
  var options = {
    prepend: 'hello-',
    append: '-world'
  };

  var builder = new broccoli.Builder(renameFiles('fixture', options));

  return builder.build().then(function(dir) {
    var oldFilepath = path.join(dir.directory, 'dummy.js');
    var newFilepath = path.join(dir.directory, 'hello-dummy-world.js');

    assert(!fs.existsSync(oldFilepath));
    assert(fs.existsSync(newFilepath));
  });
});

it('should keep the old file when instructed to do so', function () {
  var options = {
    prepend: 'hello-',
    append: '-world',
    keepOriginal: true
  };

  var builder = new broccoli.Builder(renameFiles('fixture', options));

  return builder.build().then(function(dir) {
    var oldFilepath = path.join(dir.directory, 'dummy.js');
    var newFilepath = path.join(dir.directory, 'hello-dummy-world.js');

    assert(fs.existsSync(oldFilepath));
    assert(fs.existsSync(newFilepath));
  });
});

it('allows overriding transformFilename', function () {
  var options = {
    foo: '-bar',
    transformFilename: function(filename, basename, extname) {
      return filename + '-qux-' + basename + this.options.foo + extname
    }
  };

  var builder = new broccoli.Builder(renameFiles('fixture', options));

  return builder.build().then(function(dir) {
    var oldFilepath = path.join(dir.directory, 'dummy.js');
    var newFilepath = path.join(dir.directory, 'dummy.js-qux-dummy-bar.js');

    assert(!fs.existsSync(oldFilepath));
    assert(fs.existsSync(newFilepath));
  });
});
