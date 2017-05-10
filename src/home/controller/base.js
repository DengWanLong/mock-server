'use strict';

export default class extends think.controller.base {
  /**
   * 前置魔术方法
   * @return {Promise} []
   */
  * __before(){
    let userInfo = yield this.session('userInfo');
    //如果没有登录，则跳转到登录页面
    if(think.isEmpty(userInfo)){
      return this.redirect('/login/login/login.html');
    }
    console.log("base befor");
    this.assign('userInfo', userInfo);
  }
}
