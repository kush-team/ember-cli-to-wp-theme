'use strict';
var Filter = require('broccoli-filter');
var objectAssign = require('object-assign');
var copyDereferenceSync = require('copy-dereference').sync;
var path = require('path');

function RenameFileFilter(inputTree, options) {
  if (!(this instanceof RenameFileFilter)) {
    return new RenameFileFilter(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options || {};
}

RenameFileFilter.prototype = Object.create(Filter.prototype);
RenameFileFilter.prototype.constructor = RenameFileFilter;

RenameFileFilter.prototype.processString = function(str) {
  return str;
};

RenameFileFilter.prototype.processFile = function(srcDir, destDir, relativePath) {
  if (this.options.keepOriginal) {
    copyDereferenceSync(srcDir + '/' + relativePath, destDir + '/' + relativePath);
  }

  return Filter.prototype.processFile.apply(this, arguments);
};

RenameFileFilter.prototype.getDestFilePath = function(destFilePath) {
  var dirname =  path.dirname(destFilePath);
  var extname =  path.extname(destFilePath);
  var basename =  path.basename(destFilePath, extname);
  var transformFunction = this.options.transformFilename || this.transformFilename

  var filename = transformFunction.call(this, basename + extname, basename, extname);

  return path.join(dirname, filename);
};

RenameFileFilter.prototype.transformFilename = function(filename, basename, extname) {
  var prepend = this.options.prepend || '';
  var append = this.options.append || '';

  return prepend + basename + append + extname;
};

module.exports = RenameFileFilter;
