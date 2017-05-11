<template language="html">
  <table class="ui celled table mini">
    <thead>
      <tr>
          <th>项目名称</th>
          <th>项目前缀</th>
          <th>代理路径</th>
          <th>创建时间</th>
		      <th class="center aligned" style="width:110px">操作</th>
      </tr>
      </thead>
    <tbody>
      <tr v-for="project in tables">
        <td>{{project.projectName}}</td>
        <td>{{project.projectPrefix}}</td>
        <td>{{project.proxyURL}}</td>
        <td>{{project.createTime}}</td>
        <td><a>option</a></td>
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
  methods: {
		fillCustomQueryParams(params) {

		},
		updateTable(data, params) {
			this.setPage(data.data.pages);
			this.tables = data.data.tables;
		}
  }
}
</script>

<style scoped>
</style>
