<template language="html">
  <table class="ui celled table selectable mini">
    <thead>
      <tr>
          <th>项目名称</th>
          <th>接口名称</th>
          <th>接口地址</th>
          <th>二次代理</th>
          <th>创建时间</th>
		      <th class="center aligned" style="width:150px">操作</th>
      </tr>
      </thead>
    <tbody>
      <tr v-for="interfaces in tables">
        <td>{{interfaces.projectName}}</td>
        <td>{{interfaces.interfaceName}}</td>
        <td>{{interfaces.url}}</td>
        <td>{{interfaces.proxyURL}}</td>
        <td>{{interfaces.createTime}}</td>
        <td>
          <div class="ui teal buttons">
            <a class="ui button" :href="'/api/' + interfaces.projectPrefix + '/' + interfaces.url + getParamsStr(interfaces.params)" target="_blank">测试</a>
            <div class="ui floating dropdown pointing icon button operation">
              <i class="dropdown icon"></i>
              <div class="menu">
              <!-- <div class="item" @click="onDelete()"><i class="search icon"></i>查看</div> -->
                <div class="item" @click="onEdit(interfaces)"><i class="edit icon"></i>修改</div>
                <div class="item" @click="onDelete(interfaces.id)"><i class="delete icon"></i>删除</div>
                <div class="item"><copy :content="'/api/' + interfaces.projectPrefix + '/' + interfaces.url + getParamsStr(interfaces.params)" text='<i class="copy icon"></i>&nbsp;&nbsp;复制'></copy></div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="6">
          <pagination :page="pagination.page"></pagination>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import tableMixin from '../../../mixins/table/index';
import { mapActions } from 'vuex';
import '../../../libs/jquery-zclip/jquery.zclip.js';
import  * as Common from '../../../../src/common.js';
import Copy from '../../common/Copy.vue';

export default {
  mixins: [tableMixin],
	components: { Copy },
  data() {
    return {
  		table: {
  			ajaxURL: '/home/interface/query'
  		},
      tables: [],
      params: {}
    }
  },
  methods: {
    ...mapActions(['deleteInterface']),
    setParams(params) {
      this.params = params;
    },
		fillCustomQueryParams(params) {
      for(var field in this.params) {
        let value = this.params[field];
        if(value) {
          params[field] = value;
        }
      }
      if(this.params.projectId <= 0) {
        delete params.projectId;
      }
		},
		updateTable(data, params) {
			this.setPage(data.data.pages);
			this.tables = data.data.tables;
      let timeout = setTimeout(() => {
        this.onOperation();
        clearTimeout(timeout);
      }, 10);
		},
    onOperation() {
      $(this.$el).find(".operation").dropdown();
    },
    // onTest() {
    //   alert("测试");
    // },
    onEdit(interfaceInfo) {
      this.$parent.showAddPanel(interfaceInfo);
    },
    onDelete(id) {
      this.deleteInterface({id: id});
    },
    getParamsStr(params) {
      params = Common.parse(params);
      let paramsStr = "?t="+new Date().getTime();
      Object.keys(params).forEach((key) => {
        paramsStr += "&" + key + "=" + params[key];
      });
      return paramsStr;
    }
  }
}
</script>

<style scoped>
</style>
