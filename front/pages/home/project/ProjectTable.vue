<template language="html">
  <table class="ui celled table selectable mini">
    <thead>
      <tr>
          <th>项目名称</th>
          <th>项目前缀</th>
          <th>代理路径</th>
          <th>创建时间</th>
		      <th class="center aligned" style="width:150px">操作</th>
      </tr>
      </thead>
    <tbody>
      <tr v-for="project in tables">
        <td>{{project.projectName}}</td>
        <td>{{project.projectPrefix}}</td>
        <td>{{project.proxyURL}}</td>
        <td>{{project.createTime}}</td>
        <td>
          <div class="ui teal buttons">
            <div class="ui button" @click="onLookInterface(project.id)">查看接口</div>
            <div class="ui floating dropdown pointing icon button operation">
              <i class="dropdown icon"></i>
              <div class="menu">
                <!-- <div class="item" @click="onEdit()"><i class="search icon"></i>查看</div> -->
                <div class="item" @click="onEdit(project)"><i class="edit icon"></i>修改</div>
                <div class="item" @click="onDelete(project.id)"><i class="delete icon"></i>删除</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="5">
          <pagination :page="pagination.page"></pagination>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import tableMixin from '../../../mixins/table/index';
import { mapActions } from 'vuex';

export default {
  mixins: [tableMixin],
  data() {
    return {
  		table: {
  			ajaxURL: '/home/project/query'
  		},
      tables: []
    }
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
  methods: {
    ...mapActions(['deleteProject']),
		fillCustomQueryParams(params) {

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
    onLookInterface(id) {
      this.$router.push({ name: 'interface', params: { projectId: id }});
    },
    onEdit(projectInfo) {
      this.$parent.showEditPanel(projectInfo);
    },
    onDelete(id) {
      var data = {id: id};
      data.callback = () => {
        this.$parent.query();
      };
      this.deleteProject(data);
    }
  }
}
</script>

<style scoped>
</style>
