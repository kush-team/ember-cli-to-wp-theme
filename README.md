# EmberCLI HTML to Wordpress Theme

Copy compiled index.html to index.php and replace assets path with wordpress theme url

## Usage

`ember install:addon ember-cli-html-to-wp-theme`

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

