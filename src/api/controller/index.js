'use strict';

import Base from './base.js';
import  * as Enum from '../../enum.js';
import  * as Common from '../../common.js';
import Mock from 'mockjs';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let prefix = '/api/';
    let url = this.http.url.replace(prefix, '');
    if(url.indexOf("/") == 0) {
      url = url.replace("/", '');
    }
    let temp = url.split("/");
    //检查接口地址是否符合
    if(temp.length < 2 || !temp[0] || !temp[1]) {
      return this.fail(Enum.URL_ERROR.code, Enum.URL_ERROR.msg);
    }
    let projectPrefix = temp[0];
    let interfaceUrl = url.replace(projectPrefix + '/', '');
    let params = '';
    //处理params参数
    if(interfaceUrl.indexOf("?")) {
      params = interfaceUrl.split("?")[1];
    }
    // return this.success({projectPrefix: projectPrefix, interfaceUrl: interfaceUrl, params: params});
    //查询对应项目是否存在
    let project = await this.model("project").where({projectPrefix: projectPrefix}).find();
    if(think.isEmpty(project)) {
      return this.fail(Enum.NOT_PROJECT_URL_ERROR.code, Enum.NOT_PROJECT_URL_ERROR.msg);
    }
    //查询当前项目下对应接口是否存在(精确匹配)
    let interfaces = null;
    //有入参才能进行精确匹配
    if(params) {
      interfaceUrl = interfaceUrl.replace("?" + params, '');
      let interfaceList = await this.model("interface").where({projectId: project.id, url: interfaceUrl, openExact: 1}).select();
      //获取入参
      let inParams = this.get();
      delete inParams[projectPrefix];
      if(this.isPost()) {
        inParams = this.post();
      }
      //循环对比
      for(let i = 0; i < interfaceList.length; i++) {
        interfaces = interfaceList[i];
        let params = Common.parse(interfaces.params);
        if(Common.isContainEqual(params, inParams)) {
          break;
        }
        interfaces = null;
      }
    }
    if(think.isEmpty(interfaces)) {
      //查询当前项目下对应接口是否存在(模糊匹配)
      interfaceUrl = interfaceUrl.replace("?" + params, '');
      interfaces = await this.model("interface").where({projectId: project.id, url: interfaceUrl, openExact: 0}).find();
      if(think.isEmpty(interfaces)) {
        return this.fail(Enum.NOT_INTERFACE_URL_ERROR.code, Enum.NOT_INTERFACE_URL_ERROR.msg);
      }
    }
    //判断请求方式是否匹配
    // if(!this.isAjax() || !this.isAjax(interfaces.requestType)) {
    //   return this.fail(Enum.NOT_INTERFACE_URL_ERROR.code, Enum.NOT_INTERFACE_URL_ERROR.msg);
    // }
    //判断是否打开二次代理
    if(interfaces.openProxy == 1) {
      if(!interfaces.proxyURL) {
        return this.fail(Enum.NOT_PROXY_URL_ERROR.code, Enum.NOT_PROXY_URL_ERROR.msg);
      }
    } else {
      //判断是否开启Mockjs
      if(interfaces.openMock == 1) {
        return this.json(Mock.mock(Common.parse(interfaces.result)));
      } else {
        return this.json(Common.parse(interfaces.result));
      }
    }
    return this.success();
  }
}
