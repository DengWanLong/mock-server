<template>
<div class="index-main animated bounceInUp">
    <index-head></index-head>
    <div class="index-content">
      <div class="index-panel">
        <div class="index-search">
          <div class="ui action input">
            <input type="text" placeholder="接口路径或名称" v-model="queryText" @keyup.13="query()">
            <div class="ui floating dropdown labeled search icon button select-project">
              <i class="filter icon"></i>
              <span class="text">{{projectName}}</span>
              <div class="menu">
                <div class="item" data-value="0">所有项目</div>
                <div v-for="project in projectList" class="item" :class="{'active': project.id === projectId}" :data-value="project.id">{{project.projectName}}</div>
              </div>
            </div>
            <button class="ui icon button teal" @click="query()">
              <i class="search icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="panel-spacing"></div>
      <div class="index-panel">
        <div class="title">
          <h5>接口列表</h5>
          <div class="right"><a class="ui button teal" @click="showAddPanel()">新增接口</a></div>
        </div>
        <interface-table ref="interfaceTable"></interface-table>
      </div>
    </div>
    <add-interface ref="addInterface"></add-interface>
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
import InterfaceTable from './InterfaceTable.vue';
import AddInterface from './Addinterface.vue';
import * as loader from '../../common/loader';

export default {
	components: { IndexHead, InterfaceTable, AddInterface },
	vuex: {
	},
	data() {
		return {
      projectId: 0,
      projectName: '所有项目',
      queryText: ''
		};
	},
	computed: {
    ...mapGetters({
      projectList: 'projectList'
    })
	},
  created() {
    loader.show();
    this.projectId = this.$route.params.projectId;
    this.projectName = this.$route.params.projectName;
    if(this.projectList.length <= 0) {
      let data = {callback: (data) => {
        $(this.$el).find(".select-project").dropdown({
          onChange: (value, text, $selectedItem) => {
            this.projectId = value;
          }
        });
        this.query();
        loader.close(); 
      }};
      this.queryallProject(data);
    } else {
      location.reload();
    }
  },
  mounted() {
    this.$nextTick(function () {
    })
  },
	methods: {
    ...mapActions(['queryallProject']),
    query() {
      this.$refs.interfaceTable.setParams({projectId: this.projectId, queryText: this.queryText});
      this.$refs.interfaceTable.loadTable(() => {});
    },
    showAddPanel(interfaceInfo) {
      if(this.projectList.length <= 0) {
        MessageBox.toast("请先添加项目");
        return;
      }
      this.$refs.addInterface.show(interfaceInfo);
    }
	}
}
</script>

<style scoped lang="less">
</style>
