var RSVP    = require('rsvp');
var Promise = RSVP.Promise;

module.exports = {
  	description: 'Generates an ember-data adapter.',
  	normalizeEntityName: function() {},

  	afterInstall: function(options) {
  		var _this = this;
	    return new Promise(function(resolve, reject){
	      _this.insertIntoFile('.gitignore', [
	        '',
	        '# Wordpress theme',
	        '/build/wordpress/theme'
	      ].join('\n')).then(resolve, reject);
	    });
	},
};
