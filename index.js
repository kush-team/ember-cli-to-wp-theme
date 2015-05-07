var renameFiles = require('broccoli-rename-files');
var assign = require('object-assign');
var mergeTrees = require('broccoli-merge-trees');
var replace = require('broccoli-string-replace');

module.exports = {
    name: 'ember-cli-to-wp-theme',

    defaultOptions: {
        enabled: true,
        outputFilename: 'index.php'
    },

    included: function(app) {
        this._super.included.apply(this, arguments);
        this.options = assign({}, this.defaultOptions, (app.options.htmlToWpTheme || {}));
    },

    postprocessTree: function(type, tree) {
        var returnedTree = tree,
            aux;

        if (this.options.enabled && type === 'all') {
            
            aux = this.pickFiles(tree, {
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
                  match: /src="assets/g,
                  replacement: 'src="<?php bloginfo(\'template_url\'); ?>/assets'
                },
                {
                  match: /href="assets/g,
                  replacement: 'src="<?php bloginfo(\'template_url\'); ?>/assets'
                }                
              ]
            });
            
            returnedTree = mergeTrees([tree, aux]);
        }

        return returnedTree;
    }
};