<template>
<div class="index-main animated bounceInUp">
    <index-head></index-head>
    <div class="index-content">
      <div class="ui equal width grid">
        <div class="column">
          <div class="ui segment data-source">
            <div class="ui attached top label"><span class="title">mock source</span><span class="right"><a href="http://mockjs.com/examples.html" target="_blank">mockjs</a></span></div>
              <code class="ignored code javascript">
                <textarea rows="16" cols="120" id="inputjs" class="input_section " style="display: none;">var data = {
  //错误码
  "code|0-5": 0,
  //错误信息
  "msg|1": ["success", "error"],
  //结果集
  "result|5-10": [
    {
      "id|+1": 1,
      "name": "@province"
    }
  ]
}</textarea>
              </code>
          </div>
        </div>
        <div class="one wide column">
          <div class="segment">
            <a class="ui button teal mock-button" @click="onMock()">mock</a>
          </div>
        </div>
        <div class="column">
          <div class="ui existing segment data-source">
            <div class="ui attached top label"><span class="title">mock result</span></div>
            <code class="ignored code javascript">
              <textarea rows="16" cols="120" id="outputjs" class="input_section " style="display: none;"></textarea>
            </code>
          </div>
        </div>
      </div>

    </div>
</div>
</template>

<script>
// import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import CodeMirror from '../../../node_modules/codemirror/lib/codemirror';
import Mock from 'mockjs';
import * as MessageBox from '../common/MessageBox';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/mode/javascript/javascript.js';
import IndexHead from './IndexHead';

export default {
	components: { IndexHead },
	vuex: {
	},
	data() {
		return {
      inputEditor: null,
      outputEditor: null
		};
	},
  mounted() {
    this.$nextTick(function () {
      this.inputEditor = CodeMirror.fromTextArea(document.getElementById("inputjs"), {
    	    mode: "javascript",
    	    lineNumbers: true,
    	    lineWrapping: true
    	});
      this.outputEditor = CodeMirror.fromTextArea(document.getElementById("outputjs"), {
    	    mode: "javascript",
    	    lineNumbers: true,
    	    lineWrapping: true
    	});
    })
  },
	methods: {
    onMock() {
      try {
        var source = this.inputEditor.getValue();
        if(!source.startsWith('{')) {
          source = source.substring(source.indexOf("{"), source.length);
        }
        if(!source.endsWith('}')) {
          source = source.substring(0, source.lastIndexOf("}") + 1);
        }
        if(source.includes('//') || source.includes('/*')) {
          var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g,// 正则表达式
          source = source.replace(reg, function(word) { // 去除注释后的文本
              return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
          });
        }
        var data = Mock.mock(JSON.parse(source));
        this.outputEditor.setValue(JSON.stringify(data, null, 2));
      } catch (e) {
        MessageBox.toast(e.name + ':' + e.message);
      }
    }
	}
}
</script>

<style scoped lang="less">
.index-main {

  .index-content {
    padding: 20px;
  }
}
</style>
