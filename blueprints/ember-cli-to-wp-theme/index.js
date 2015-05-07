module.exports = {
  description: 'Generates an ember-data adapter.',

  availableOptions: [
    { name: 'base-class', type: String }
  ],

  locals: function(options) {
    var baseClass       = 'WPAdapter';
    var importStatement = 'import WPAdapter from \'ember-cli-to-wp-theme/adapters/application\';';
    options.baseClass = 'application';
 

    return {
      importStatement: importStatement,
      baseClass: baseClass
    };
  }
};
