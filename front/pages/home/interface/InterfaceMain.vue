<template>
<div class="index-main animated bounceInUp">
    <index-head></index-head>
    <div class="index-content">

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

export default {
	components: { IndexHead },
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
    })
  },
	methods: {
    ...mapActions(['getUserInfo'])
	}
}
</script>

<style scoped lang="less">
</style>
