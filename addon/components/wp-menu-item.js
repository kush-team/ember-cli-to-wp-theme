import Ember from 'ember';
import layout from '../templates/components/wp-menu-item';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'li',
  
  isCustom: Ember.computed('item' , function() {
    return this.get('item').get('object') === 'custom';
  }),

  link: Ember.computed('item' , function() {
  	var route = 'index';
  	switch (this.get('item').get('object')) {
  		case 'page':
  			route = 'page.show';
  			break;  			
  		case 'post':
  			route = 'post.show';
  			break;  			
  		case 'category':
  			route = 'term.show';
  			break;  			  			  			
  		default:
  			break;
  	}
    return route;
  })
});
