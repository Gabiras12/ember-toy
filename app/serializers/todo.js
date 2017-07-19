import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize(snapshot) {
    return {
        description: snapshot.attr('description'),
        done: snapshot.attr('done')
    };
  },

  normalizeResponse(store, primaryModelClass, payload, requestType) {
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

  normalizeDeleteRecordResponse (store, primaryModelClass, payload, id, requestType) {
    return null;
  },

  normalizeTodo(todoJSON) {
    return {
      id: todoJSON.id,
      type: 'todo',
      attributes: {
        description: todoJSON.description,
        done: todoJSON.done
      }
    }
  }
});
