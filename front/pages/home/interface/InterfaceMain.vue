<template>
<div class="index-main animated bounceInUp">
    <index-head></index-head>
    <div class="index-content">
      <div class="index-panel">
        <div class="index-search">
          <div class="ui action input">
            <input type="text" placeholder="接口路径或名称">
            <div class="ui floating dropdown labeled search icon button select-project">
              <i class="filter icon"></i>
              <span class="text">选择项目</span>
              <div class="menu">
                <div class="item">所有项目</div>
                <div class="item active">商家数据中心</div>
                <div class="item">众包</div>
              </div>
            </div>
            <button class="ui icon button teal">
              <i class="search icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="panel-spacing"></div>
      <div class="index-panel">
        <div class="title">
          <h5>接口列表</h5>
          <div class="right"><a class="ui button teal">新增接口</a></div>
        </div>
        <interface-table ref="projecttable"></interface-table>
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
import InterfaceTable from './InterfaceTable.vue';

export default {
	components: { IndexHead, InterfaceTable },
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
      $(this.$el).find(".select-project").dropdown();
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
