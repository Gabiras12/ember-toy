import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize(snapshot) {
    return {
      description: snapshot.attr('description')
    };
  },

  normalizeResponse(store, primaryModelClass, payload) {
      let normalizedPayload = { data: [] };

      if (Array.isArray(payload)) { // a list
        payload.forEach(todoJSON => {
          normalizedPayload.data.push(this.normalizeTodo(todoJSON));
        })
      } else { // one element
        normalizedPayload.data = this.normalizeTodo(payload);
      }

      return normalizedPayload;
  },

  normalizeTodo(todoJSON) {
    return {
      id: todoJSON.id,
      type: 'todo',
      attributes: {
        description: todoJSON.description
      }
    }
  }
});
