<template>
<div class="index-main animated bounceInUp">
    <index-head></index-head>
    <div class="index-content">
      <div class="index-panel">
        <div class="title">
          <h5>项目列表</h5>
          <div class="right"><a class="ui button teal" @click="showAddPanel()">新增项目</a></div>
        </div>
        <project-table ref="projecttable"></project-table>
      </div>
    </div>
    <add-project ref="addProject"></add-project>
</div>
</template>

<script>
// import $ from 'jquery';
import CodeMirror from '../../../../node_modules/codemirror/lib/codemirror';
import Mock from 'mockjs';
import * as MessageBox from '../../common/MessageBox';
import '../../../../node_modules/codemirror/lib/codemirror.css';
import '../../../../node_modules/codemirror/mode/javascript/javascript.js';
import IndexHead from '../IndexHead';
import ProjectTable from './ProjectTable.vue';
import AddProject from './AddProject.vue';

export default {
	components: { IndexHead, ProjectTable, AddProject },
	vuex: {
	},
	data() {
		return {
		};
	},
  mounted() {
    this.$nextTick(function () {
      this.query();
    })
  },
	methods: {
    query() {
      this.$refs.projecttable.loadTable(() => {});
    },
    showAddPanel() {
      this.$refs.addProject.show();
    },
    showEditPanel(data) {
      this.$refs.addProject.show(data);
    }
	}
}
</script>

<style scoped lang="less">
</style>
