'use strict';

import Base from './base.js';
import  * as Enum from '../../enum.js';
import  * as Common from '../../common.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async queryAction(){
    let pageNo = this.get("pageNo");
    let pageSize = this.get("pageSize");
    let projectId = this.get("projectId");
    let queryText = this.get("queryText");
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    let where = {"ua.userId": userInfo.id};
    if(!think.isEmpty(projectId)) {
      where["p.id"] = projectId;
    }
    if(!think.isEmpty(queryText)) {
      // where["i.interfaceName"] = ["like", "%" + queryText + "%"];
      where._complex = {
        "i.interfaceName": ["like", "%" + queryText + "%"],
        "i.url": ["like", "%" + queryText + "%"],
        _logic: "or"
      };
    }
    var result = await this.model("interface").alias('i').join([
      'INNER JOIN project as p ON i.projectId=p.id',
      'INNER JOIN userAuth as ua on p.id=ua.projectId'
    ]).page(pageNo, pageSize).where(where)
    .field("i.id,i.projectId,i.interfaceName,i.url,i.proxyUrl,i.requestType,i.openExact,i.params,i.result,i.code,i.openMock,i.openProxy,date_format(i.createTime, '%Y-%c-%d %h:%i:%s' ) as createTime,p.projectName,p.projectPrefix")
    .countSelect();
    if(think.isEmpty(result)) {
      return this.success({pages: {pageNo: pageNo, pageSize: pageSize, totalCount: 0, totalPage: 0}, tables: []});
    }
    return this.success({pages: {pageNo: pageNo, pageSize: pageSize, totalCount: result.count, totalPage: result.totalPages}, tables: result.data});
  }

  async addAction() {
    //获取所有入参
    let allParams = this.post();
    //判断用户是否登录
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }

    let model = this.model("interface");
    let interfaces = await model.where({projectId: allParams.projectId, interfaceName: allParams.interfaceName}).find();
    if(!think.isEmpty(interfaces) && !think.isEmpty(interfaces.id)) {
      return this.fail(Enum.ADD_INTERFACE_NAME_ERROR.code, Enum.ADD_INTERFACE_NAME_ERROR.msg);
    }
    let params = Common.parse(allParams.params);
    let interfaceList = await model.where({projectId: allParams.projectId, url: allParams.url}).select();
    for(let i = 0; i < interfaceList.length; i++) {
      interfaces = interfaceList[i];
      let oldParams = Common.parse(interfaces.params);
      //模糊匹配url不能相同，精确匹配参数不能相同，模糊匹配的地址与精确匹配的地址不能相同
      if(allParams.openExact == 0 || interfaces.openExact == 0 || Common.isContainEqual(params, oldParams) || Common.isContainEqual(oldParams, params)) {
        return this.fail(Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.code, Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.msg);
      }
    }


    await this.model("interface").add(allParams);
    return this.success();
  }

  async editAction() {
    //获取所有入参
    let allParams = this.post();
    //判断用户是否登录
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    var id = allParams.id;
    delete allParams.id;
    let model = this.model("interface");
    let interfaces = await model.where({projectId: allParams.projectId, id: ['!=', id], interfaceName: allParams.interfaceName}).find();
    if(!think.isEmpty(interfaces) && !think.isEmpty(interfaces.id)) {
      return this.fail(Enum.ADD_INTERFACE_NAME_ERROR.code, Enum.ADD_INTERFACE_NAME_ERROR.msg);
    }
    let params = Common.parse(allParams.params);
    let interfaceList = await model.where({projectId: allParams.projectId, id: ['!=', id], url: allParams.url}).select();
    for(let i = 0; i < interfaceList.length; i++) {
      interfaces = interfaceList[i];
      let oldParams = Common.parse(interfaces.params);
      //模糊匹配url不能相同，精确匹配参数不能相同，模糊匹配的地址与精确匹配的地址不能相同
      if(allParams.openExact == 0 || interfaces.openExact == 0 || Common.isContainEqual(params, oldParams) || Common.isContainEqual(oldParams, params)) {
        return this.fail(Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.code, Enum.ADD_INTERFACE_URL_OR_PARAMS_ERROR.msg);
      }
    }

    await this.model("interface").where({id: id}).update(allParams);
    return this.success();
  }

  async deleteAction() {
    let id = this.get("id");
    let userInfo = await this.session("userInfo");
    if(think.isEmpty(userInfo)) {
      return this.fail(Enum.NOT_NOGIN.code, Enum.NOT_NOGIN.msg);
    }
    await this.model("interface").where({id: id}).delete();
    return this.success();
  }
}
