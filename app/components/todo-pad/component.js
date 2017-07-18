import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createTodo() {
      this.sendAction('createTodo', this.get('newTodo'));
      this.set('newTodo', '');
    }
  }
});
