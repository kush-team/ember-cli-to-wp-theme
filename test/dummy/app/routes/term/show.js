import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
      return Ember.RSVP.hash({
          term: this.store.find('term', params.term_id),
          posts: this.get('store').find('post', {filter: {cat: params.term_id}})
      });		
	}
});
