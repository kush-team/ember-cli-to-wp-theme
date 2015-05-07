import DS from 'ember-data'; 

export default DS.Model.extend({ 
	name: DS.attr('string'), 
	slug: DS.attr('string'), 
	description: DS.attr('string'), 
	count: DS.attr('number'), 
	items: DS.hasMany('item') 
});