import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
	host: config.wp.host || location.host,
	namespace: config.wp.namespace || 'wp-json',
});