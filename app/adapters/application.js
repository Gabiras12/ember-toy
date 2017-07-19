import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  },

  deleteRecord(store, type, snapshot) {
    var id = snapshot.id;

    return this.ajax(this.buildURL(type.modelName, id, snapshot, 'deleteRecord'), "DELETE")
      .then(response => {
        if(Object.keys(response).length === 0) {
          return null;
      }
      return response;
    });
  }
});
