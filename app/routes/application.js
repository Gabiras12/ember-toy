import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('todo');
  },

  actions: {
    createTodo(aTodo) {
      let todo = this.store.createRecord('todo', {
        description: aTodo
      });

      todo.save().then(recentCreteatedTodo => {
        console.log(recentCreteatedTodo);
      })
    }
  }
});
