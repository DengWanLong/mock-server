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
</div>
</template>

<script>
// import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import CodeMirror from '../../../../node_modules/codemirror/lib/codemirror';
import Mock from 'mockjs';
import * as MessageBox from '../../common/MessageBox';
import '../../../../node_modules/codemirror/lib/codemirror.css';
import '../../../../node_modules/codemirror/mode/javascript/javascript.js';
import IndexHead from '../IndexHead';
import ProjectTable from './ProjectTable.vue';

export default {
	components: { IndexHead, ProjectTable },
	vuex: {
	},
	data() {
		return {
		};
	},
	computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
	},
  mounted() {
    this.$nextTick(function () {
      $(this.$el).find(".project-panel").shape("repaint");
      this.$refs.projecttable.loadTable(() => {});
    })
  },
	methods: {
    ...mapActions(['getUserInfo'])
	}
}
</script>

<style scoped lang="less">
</style>
