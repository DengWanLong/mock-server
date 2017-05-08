'use strict';
import Base from './base.js';
import Mock from 'mockjs';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.base {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  __before(){
    
  }

  async getAction(){
    this.success(Mock.mock({
      'code|0-5': 0,
      'msg|1': ['success', 'error'],
      'result|5-10': [
        {
          'id|+1': 1,
          'name': '@province'
        }
      ]
    }));
    //this.success({code: 0, msg: "success", data: [{id: 1, name: 'test1'}, {id: 2, name: "test2"}]});
  }

  async loadcity1Action(){
    this.success(Mock.mock({
      'cityList|5-10': [
        {
          'id|+1': 1,
          'name': '@city'
        }
      ]
    }));
  }
}