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
            <div class="ui button" @click="onTest()">测试</div>
            <div class="ui floating dropdown pointing icon button operation">
              <i class="dropdown icon"></i>
              <div class="menu">
              <!-- <div class="item" @click="onDelete()"><i class="search icon"></i>查看</div> -->
                <div class="item" @click="onEdit(interfaces)"><i class="edit icon"></i>修改</div>
                <div class="item" @click="onDelete(interfaces.id)"><i class="delete icon"></i>删除</div>
                <div class="item copy-button" :data-clipboard-text="interfaces.url"><i class="copy icon"></i>复制</div>
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
import ZeroClipboard from '../../../libs/zeroclipboard-2.2.0/dist/ZeroClipboard.js';
import '../../../libs/jquery-zclip/jquery.zclip.js';

export default {
  mixins: [tableMixin],
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
        this.onCopy();
        clearTimeout(timeout);
      }, 10);
		},
    onOperation() {
      $(this.$el).find(".operation").dropdown();
    },
    onTest() {
      alert("测试");
    },
    onEdit(interfaceInfo) {
      this.$parent.showAddPanel(interfaceInfo);
    },
    onDelete(id) {
      this.deleteInterface({id: id});
    },
    onCopy() {
      $('.copy-button').zclip({
        copy: function(){
          return "/api/test";
        }
      });
      // var client = new ZeroClipboard(document.querySelector('.copy-button'));
      // console.log(client);
      // client.elements(document.querySelectorAll('.copy-button'));
      // client.setText(url);
      // client.on("ready", function(readyEvent) {
      //   client.on("aftercopy", function(event) {
      //     alert("复制成功，地址为: " + event.data["text/plain"]);
      //   });
      // });
      // let $target = $("<input type='hidden'>");
      // $target.val(url);
      // let js = $target[0].createTextRange();
      // js.execCommand("Copy");
    }
  }
}
</script>

<style scoped>
</style>
