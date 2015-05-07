import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: location.host,
	namespace: 'wp-json',
	pathForType: function (type) {
	  if (type === 'category' ||  type === 'subcategory' || type === 'term')
	   return 'taxonomies/category/terms';
	  else
	   this._super(type);
	}
});