import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  metaData: {},
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    //deserialization for search results
    if (payload.hasOwnProperty('search')) {
      //grabs the metadata before normalizing it all away
      let meta = {};
      meta.result_count = payload.search.result_count;
      meta.per_page = payload.search.per_page;
      meta.page = payload.search.page;
      meta.facets = payload.search.facets;
      this.set('metaData', meta);
      //returns the payload without any of the metadata attached
      return this._super(store, primaryModelClass, payload.search.results, id, requestType);
    }
    //deserialization for single page
    if (payload.hasOwnProperty('record')){
      return this._super(store, primaryModelClass, payload.record, id, requestType);
    }
  },
  extractMeta(){
    return this.get('metaData');
  }
});
