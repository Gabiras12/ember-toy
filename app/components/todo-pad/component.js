import Ember from 'ember';

export default Ember.Component.extend({

  filter: 'todos',
  isDoneHasChanged: Ember.observer('todos.@each.done', function() {
      let todos = this.get('todos');

      todos.toArray().forEach( todo => {
        if (todo.get('hasDirtyAttributes')) {
          todo.save().then(() => {
            console.log('updated todo');
          });
        }
      });
  }),

  all: Ember.computed('filter', function() {
    return this.get('filter') === 'todos';
  }),

  completed: Ember.computed('filter', function() {
    return this.get('filter') === 'completos';
  }),

  imcompleted: Ember.computed('filter', function() {
    return this.get('filter') === 'incompletos';
  }),

  filtedTodos: Ember.computed('todos', 'filter', function() {
    let todos = this.get('todos').toArray();

    if (this.get('filter') === 'todos') {
      return todos;
    } else {
      return todos.filter((item) => {
        if (this.get('filter') === 'completos') {
          return item.get('done');
        } else {
          if (this.get('filter') === 'incompletos') {
            return !item.get('done');
          }
        }
      })
    }
  }),

  actions: {
    createTodo() {
      this.sendAction('createTodo', this.get('newTodo'));
      this.set('newTodo', '');
    },

    removeTodo(aTodo) {
      aTodo.destroyRecord().then( () => {
        console.log('todo deleted');
      })
    },

    editTodo(aTodo) {
      aTodo.set('done', false);
      aTodo.set('isEditing', true);
    },

    updateTodo(aTodo) {
      aTodo.save().then(() => {
        aTodo.set('isEditing', false);
      })
    },

    filter(aFilter) {
      this.set('filter', aFilter);
    }
  }
});
