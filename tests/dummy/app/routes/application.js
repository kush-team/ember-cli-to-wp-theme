import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		return this.store.find('menu', 2);
	},

	setupController: function (controller, model) {
		this._super(controller, model);
	}
});
