var Filter = require('broccoli-filter');

function SimpleReplace (inputTree, options) {
  if (!(this instanceof SimpleReplace)) return new SimpleReplace(inputTree, options);

  Filter.call(this, inputTree, options); // this._super()

  options = options || {};

  this.inputTree   = inputTree;
  this.files       = options.files || [];
  this.patterns    = options.patterns;
  this.description = options.description;

  if (options.patterns) {
    this.patterns = options.patterns;
  } else if (options.pattern) {
    this.patterns = [options.pattern];
  } else {
    this.patterns = [];
  }
};
SimpleReplace.prototype = Object.create(Filter.prototype);
SimpleReplace.prototype.constructor = SimpleReplace;

SimpleReplace.prototype.canProcessFile = function (relativePath) {
  if (this.files.indexOf(relativePath) > -1) {
    return true;
  } else {
    return null;
  }
}

SimpleReplace.prototype.getDestFilePath = function(relativePath) {
  return relativePath;
};

SimpleReplace.prototype.processString = function (str) {
  for (var i = 0, l = this.patterns.length; i < l; i++) {
    var pattern = this.patterns[i];

    str = str.replace(pattern.match, pattern.replacement);
  }

  return str;
};

module.exports = SimpleReplace;
