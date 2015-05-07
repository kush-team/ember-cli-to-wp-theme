# EmberCLI to Wordpress Theme

Copy compiled index.html to index.php and replace assets path with wordpress theme url

## Usage

`ember install:addon ember-cli-to-wp-theme`

`ember generate ember-cli-to-wp-theme application`

app/adapters/application.js

```
import WPAdapter from 'ember-cli-to-wp-theme/adapters/application';

export default WPAdapter.extend({
	host: 'http://yourwordpres.org',
	namespace: 'your/name/space'
});

```
After build `dist/index.html` will be copied to `dist/index.php` and replace assets path

## Configuration

```
var app = new EmberApp({
	htmlToWpTheme: {
		/*
		Default options are:
			enabled: true,
			outputFilename: 'index.php'
		*/
	}	
})

