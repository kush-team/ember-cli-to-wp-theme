[![Build Status](https://travis-ci.org/kush-team/ember-cli-to-wp-theme.svg)](https://travis-ci.org/kush-team/ember-cli-to-wp-theme)
[![Codacy Badge](https://www.codacy.com/project/badge/31a0e03e77cf4345a0f57ae7ad7451b9)](https://www.codacy.com/app/mbiondo/ember-cli-to-wp-theme)

<img src="http://www.goblab.org/ember-wp/img/ember-wp.png" width="240" />

## Background

This project utilises two key developments from Ember and WordPress. Firstly the ability to write a custom adapter for Ember Data, in this case it is possible to use the `DS.RESTAdapter` as-is and simply extend `DS.RESTSerializer`.

Secondly the [WP REST API](https://github.com/WP-API/WP-API) which is currently being developed as a plugin with a view to be be merged to core in the next major release (4.1).

## Usage

For ember-cli >= 0.2.3, run:

```bash
ember install ember-cli-to-wp-theme
```

Otherwise, for ember-cli 0.1.5 - 0.2.2, run:

```bash
ember install:addon ember-cli-to-wp-theme`
```

## Models
```
User
Menu
Item
Post
Page
Tag
Term
```

## Components
```
wp-menu
wp-menu-item

```

After build `dist/index.html` will be copied to `dist/index.php` and replace assets path

## Configuration

app/adapters/application.js

```
import WPAdapter from 'ember-cli-to-wp-theme/adapters/application';

export default WPAdapter.extend({
	host: 'http://yourwordpres.org',
	namespace: 'your/name/space'
});
```
### Code Generators

`ember generate wp-menu-templates`

```
installing
  create app/templates/components/wp-menu-item.hbs
  create app/templates/components/wp-menu.hbs

```

`ember generate wp-theme-files`

```
installing
  create public/screenshot.png
  create public/style.css
```

Brocfile.js
```
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
   fingerprint: {
    	exclude: ['screenshot.png', 'style.css'],
   }
});
...
...
```


### TO-DO
- [ ] Command for package: ember wp:package
- [ ] Support for comments
- [ ] Wordpress theme configuration



## Development Setup

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running Tests

* `ember try:testall`
* `ember test`
* `ember test --server`

### Running the dummy app

* `ember server`
* Visit your app at http://localhost:4200.

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

