module.exports = {
  description: 'Generates an ember-data adapter.',

  availableOptions: [
    { name: 'base-class', type: String }
  ],

  locals: function(options) {
    var adapterName     = options.entity.name;
    var baseClass       = 'WPAdapter';
    var importStatement = 'import WPAdapter from \'ember-cli-to-wp-theme/adapters/application\';';

    if (!options.baseClass && adapterName !== 'application') {
      options.baseClass = 'application';
    }

    if (options.baseClass === adapterName) {
      throw new SilentError('Adapters cannot extend from themself. To resolve this, remove the `--base-class` option or change to a different base-class.')
    }

    if (options.baseClass) {
      baseClass = stringUtil.classify(options.baseClass.replace('\/', '-'));
      baseClass = baseClass + 'Adapter';

      importStatement = 'import ' + baseClass + ' from \'./' + options.baseClass + '\';'
    }

    return {
      importStatement: importStatement,
      baseClass: baseClass
    };
  }
};
