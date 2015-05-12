var RSVP    = require('rsvp');
var Promise = RSVP.Promise;

module.exports = {
  name: 'wp:package',
  description: 'Build and package wordpress theme',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'environment',
      type: String,
      default: 'development',
      aliases: [
        'e',
        { 'dev': 'development' },
        { 'prod': 'production' }
      ],
    },
    {
      name: 'output-path',
      type: String,
      default: 'build/wordpress/theme',
      aliases: ['o']
    },
    {
      name: 'skip-build',
      type: Boolean,
      default: false,
      aliases: ['sb']
    },
    {
      name: 'log',
      type: Boolean,
      default: true,
      aliases: ['l']
    }
  ],

  clean: function(options) {
    var fs = require('fs');
    var _this = this;
    return new Promise(function(resolve, reject){
      if (fs.existsSync(_this.project.root + '/' + options.outputPath + '/' + _this.project.pkg.name + '.zip')) {
        fs.unlink(_this.project.root + '/' + options.outputPath + '/' + _this.project.pkg.name + '.zip', function() {
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  build: function(options) {

    if (options.skipBuild) {
      return Promise.resolve();
    } else {
      var BuildTask = this.tasks.Build;
      var buildTask = new BuildTask({
        ui: this.ui,
        analytics: this.analytics,
        project: this.project
      });

      return buildTask.run({
        environment: options.environment,
        outputPath: 'dist/'
      });
    }
  },

  package: function(options) {
    var fs = require('fs');
    var path  = require('path');
    var chalk = require('chalk');
    var cmd = require('../../utils/cmd');
    var _this = this;

    this.ui.startProgress(chalk.green('Packaging'), chalk.green('.'));

    if (!fs.existsSync(_this.project.root + '/' + options.outputPath)) {
      var parts = options.outputPath.split('/');
      for( var i = 1; i <= parts.length; i++ ) {
        fs.mkdirSync( path.join.apply(null, parts.slice(0, i)) );
      }      
    }
    return cmd('cd dist/ && zip', ['-r', this.project.root + '/' + options.outputPath + '/' + _this.project.pkg.name + '.zip', '.', '&& cd ..'], {
      useExec: true,
      logStdout: options.log
    }).then(function(){
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.green('Packaged Wordpress theme succesfully. Stored in "' + options.outputPath + '" as "' + _this.project.pkg.name + '.zip"'));
    }, function(e){
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.red('Packaging failed.' + (e ? ' ' + e.message : '')));
    });
  },

  run: function(options) {
    var _this = this;
    return this.clean(options).then(function() {
      return _this.build(options).then(function() {
        return _this.package(options);
      });
    });
  }
}