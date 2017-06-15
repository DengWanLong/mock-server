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
    let result = await this.model("project").join({
      table: "userAuth",
      join: "inner",
      as: 'ua',
      on: ['id', 'projectId']
    }).page(pageNo, pageSize).where({'ua.userId': userInfo.id}).field("project.id,project.projectName,project.projectPrefix,project.proxyURL,date_format(project.createTime, '%Y-%c-%d %h:%i:%s' ) as createTime").countSelect();
    if(think.isEmpty(result)) {
      return this.success({pages: {pageNo: pageNo, pageSize: pageSize, totalCount: 0, totalPage: 0}, tables: []});
    }
    return this.success({pages: {pageNo: pageNo, pageSize: pageSize, totalCount: result.count, totalPage: result.totalPages}, tables: result.data});
  }

  async queryallAction() {
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    let result = await this.model("project").join({
      table: "userAuth",
      join: "inner",
      as: 'ua',
      on: ['id', 'projectId']
    }).where({'ua.userId': userInfo.id}).field("project.id,project.projectName,project.projectPrefix").select();
    return this.success(result);
  }

  async addAction() {
    let projectName = this.get('projectName');
    let projectPrefix = this.get('projectPrefix');
    let proxyURL = this.get('proxyURL');
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    let model = this.model("project");
    // let insertId = await model.transaction( async function * () {
    //   let projectId = await model.add({projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL});
    //   return await this.model('userAuth').add({userId: userInfo.id, projectId: projectId, isManage: 1});
    // })
    // let insertId = await this.model("project").add({projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL});
    try {
      // await model.startTrans();
      let project = model.where({projectName: projectName}).find();
      if(!think.isEmpty(project)) {
        return this.fail(Enum.ADD_PROJECT_NAME_ERROR.code, Enum.ADD_PROJECT_NAME_ERROR.msg);
      }
      project = model.where({projectPrefix: projectPrefix}).find();
      if(!think.isEmpty(project)) {
        return this.fail(Enum.ADD_PROJECT_PREFIX_ERROR.code, Enum.ADD_PROJECT_PREFIX_ERROR.msg);
      }

      let projectId = await model.add({projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL});
      let insertId = await this.model("userAuth").add({userId: userInfo.id, projectId: projectId, isManage: 1});
      // await model.commit();
    } catch(e) {
      // await model.rollback();
      return this.fail(Enum.ADD_ERROR.code, Enum.ADD_ERROR.msg);
    }
    return this.success();
  }

  async editAction() {
    let id = this.get('id');
    let projectName = this.get('projectName');
    let projectPrefix = this.get('projectPrefix');
    let proxyURL = this.get('proxyURL');
    let model = this.model("project");
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    try {
      let project = model.where({id: ['!=', id], projectName: projectName}).find();
      if(!think.isEmpty(project)) {
        return this.fail(Enum.ADD_PROJECT_NAME_ERROR.code, Enum.ADD_PROJECT_NAME_ERROR.msg);
      }
      project = model.where({id: ['!=', id], projectPrefix: projectPrefix}).find();
      if(!think.isEmpty(project)) {
        return this.fail(Enum.ADD_PROJECT_PREFIX_ERROR.code, Enum.ADD_PROJECT_PREFIX_ERROR.msg);
      }

      let affectedRows = await model.where({id: id}).update({projectName: projectName, projectPrefix: projectPrefix, proxyURL: proxyURL});
    } catch(e) {
      return this.fail(Enum.EDIT_ERROR.code, Enum.EDIT_ERROR.msg);
    }
    return this.success();
  }

  async deleteAction() {
    let id = this.get('id');
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    let model = this.model("project");
    try {
      let interfaceCount = this.model("interface").field("id").where({projectId: id}).count();
      if(interfaceCount > 0) {
        return this.fail(Enum.DELETE_PROJECT_INTERFACE_ERROR.code, Enum.DELETE_PROJECT_INTERFACE_ERROR.msg);
      }
      await this.model("userAuth").where({projectId: id}).delete();
      await model.where({id: id}).delete();
    } catch(e) {
      return this.fail(Enum.DELETE_ERROR.code, Enum.DELETE_ERROR.msg);
    }
    return this.success();
  }
}
