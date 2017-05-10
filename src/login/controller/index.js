'use strict';

import Base from './base.js';
import  * as Enum from '../../enum.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  async loginAction() {
    let model = this.model('user');
    let data = await model.where({userName: this.get('userName')}).find();
    //data returns {name: 'thinkjs', email: 'admin@thinkjs.org', ...}
    if(!think.isEmpty(data)) {
      if(data.password != think.md5(this.get('password'))) {
        return this.fail(Enum.USER_NOT_PASSWORD.code, Enum.USER_NOT_PASSWORD.msg);
      }
    } else {
      return this.fail(Enum.USER_NO_DATA.code, Enum.USER_NO_DATA.msg);
    }
    delete data.password;
    await this.session("userInfo", data);
    return this.success(data);
  }

  async logoutAction() {
    await this.session();
    return this.success();
  }

  async getuserinfoAction() {
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.success();
    }
    return this.success(userInfo);
  }
}
