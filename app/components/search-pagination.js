import Ember from 'ember';

export default Ember.Component.extend({
  //default variables
  display: 'both',
  offsetAmount: '',
  init() {
    this._super(...arguments);
    this.set('offsetAmount', this.get('meta.per_page'))
  },
  //computed value of last page that will contain content
  lastPage: Ember.computed('meta', function(){
    return Math.ceil(this.get('meta.result_count') / this.get('meta.per_page'));
  }),
  //computed value of current record offset based on page
  offset: Ember.computed('meta', function(){
    return ((this.get('meta.page') - 1) * this.get('meta.per_page') + 1);
  }),
  //computed value of the end current offset
  offsetLast: Ember.computed('meta', 'offset', function(){
    let potentialOffsetLast = this.get('offset') + this.get('meta.per_page') - 1;
    //if there are more results than what will be displayed, return offset + per_page
    if (this.get('meta.result_count') > potentialOffsetLast){
      return potentialOffsetLast;
    } else {
      //otherwise, return the result count.
      return this.get('meta.result_count');
    }
  }),
  offsetOptions: [
    {value: 10},
    {value: 20},
    {value: 50},
    {value: 100},
  ],
  actions: {
    selectOffset(value){
      this.set('offsetAmount', value);
      this.get('onChange')(value);
    }
  }
});
