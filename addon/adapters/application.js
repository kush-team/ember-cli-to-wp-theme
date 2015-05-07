import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: location.host,
	namespace: 'wp-json',
});