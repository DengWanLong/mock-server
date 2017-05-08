'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let model = this.model('user');
    let data = await model.where({userName: 'admin'}).find();
    //data returns {name: 'thinkjs', email: 'admin@thinkjs.org', ...}
    return this.success(data);
    // return this.display();
  }
}
