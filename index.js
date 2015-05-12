var renameFiles = require('broccoli-rename-files');
var assign = require('object-assign');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var replace = require('broccoli-string-replace');

module.exports = {
    name: 'ember-cli-to-wp-theme',
    defaultOptions: {
        outputFilename: 'index.php'
    },

    included: function(app) {
        this.options = assign({}, this.defaultOptions, (app.options.wpTheme || {}));
        if (process.argv[2] === 'wp:package') {
          this.options.enabled = true;
          app.options.fingerprint.enabled = false;
        } 
    },

    includedCommands: function() {
        var commands = require('./lib/commands');
        return commands;
    },

    postprocessTree: function(type, tree) {
        var returnedTree = tree,
            aux;
        if (this.options.enabled && type === 'all') {
            
            aux = funnel(tree, {
                srcDir: '.',
                files: ['index.html'],
                destDir: '.'
            });

            aux = renameFiles(aux, {
                transformFilename: function() {
                    return this.options.outputFilename;
                }.bind(this)
            });

            aux = replace(aux, {
              files: [
                'index.php' 
              ],
              patterns: [
                {
                  match: /="assets/g,
                  replacement: '="<?php bloginfo(\'template_url\'); ?>/assets'
                },
                {
                  match: /<title>.*?<\/title>/g,
                  replacement: "<title><?php bloginfo('name'); ?></title>"
                }                

              ]
            });
        
            returnedTree = mergeTrees([tree, aux]);
        }

        return returnedTree;
    }    
};