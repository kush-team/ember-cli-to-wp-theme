import DS from 'ember-data'; 

export default DS.Model.extend({ 
	order: DS.attr('number'), 
	parent: DS.attr('number'), 
	title: DS.attr('string'), 
	url: DS.attr('string'), 
	attr: DS.attr('string'), 
	target: DS.attr('string'), 
	classes: DS.attr('string'), 
	xfn: DS.attr('string'), 
	description: DS.attr('string'), 
	object_id: DS.attr('number'), 
	object: DS.attr('string'), 
	type: DS.attr('string'), 
	type_label: DS.attr('string'),
});