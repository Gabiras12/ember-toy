import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  done: DS.attr('boolean', {defaultValue: false}),

  isEditing: DS.attr('boolean', {defaultValue: false})
});
