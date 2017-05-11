'use strict';

import Base from './base.js';
import  * as Enum from '../../enum.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async queryAction(){
    let pageNo = this.get("pageNo");
    let pageSize = this.get("pageSize");
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    let result = this.model("project").join({
      table: "userAuth",
      join: "inner",
      as: 'ua',
      on: ['id', 'projectId']
    }).page(pageNo, pageSize)
    .where({userId: userInfo.id}).select();
    if(think.isEmpty(result)) {
      return this.success({pages: {pageNo: pageNo, pageSize: pageSize, totalCount: resut.count, totalPage: result.totalPages}, tables: result.data});
    }
    return this.success({pages: {pageNo: pageNo, pageSize: pageSize, totalCount: 0, totalPage: 0}, tables: []});
  }
}
