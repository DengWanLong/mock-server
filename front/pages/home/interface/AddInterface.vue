<template>
  <div class="ui modal small">
    <div class="header">新增项目</div>
    <div class="content">
      <form class="ui form">
        <input type="text" class="foucus-input"/>
        <div class="page" :class="{'animated fadeIn': pageNo == 1, 'animated fadeOut': pageNo != 1}">
          <ul>
            <li>
              <label>所属项目：</label>
              <div class="ui input field">
                <select name="projectId" v-model="interfaceInfo.projectId" class="ui select search"><option v-for="project in projectList" :value="project.id">{{project.projectName}}</option></select>
              </div>
            </li>
            <li>
              <label>接口名称：</label>
              <div class="ui input field">
                <input name="interfaceName" type="text" v-model="interfaceInfo.interfaceName" placeholder="接口名称">
              </div>
            </li>
          </ul>
        </div>
        <div class="page" :class="{'animated fadeIn': pageNo == 2, 'animated fadeOut': pageNo != 2}">
          <ul>
            <li>
              <label>请求类型：</label>
              <div class="ui input field">
                <select name="requestType" class="ui select" v-model="interfaceInfo.requestType">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </li>
            <li>
              <label>接口地址：</label>
                <div class="ui labeled input field">
                <div class="ui label">/api/{{getProjectPrefix}}</div>
                <input name="url" type="text" v-model="interfaceInfo.url" placeholder="接口地址">
              </div>
            </li>
            <li>
              <label>Url匹配方式：</label>
              <div class="ui input field">
                <div class="ui radio">
                  <label><input name="openExact" type="radio" v-model="interfaceInfo.openExact" value="0">只匹配[?]前部分</label>
                </div>
                <div class="lateral-spacing"></div>
                <div class="ui radio">
                  <label><input name="openExact" type="radio" v-model="interfaceInfo.openExact" value="1">精确匹配</label>
                </div>
              </div>
            </li>
            <li>
              <label>请求参数：</label>
              <div class="ui existing mini-panel segment data-source">
                <div class="ui attached top label"><span class="title">params</span></div>
                <code class="ignored code javascript">
                  <textarea rows="16" cols="120" id="params" name="params" v-model="interfaceInfo.params" class="input_section " style="display: none;"></textarea>
                </code>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="pageNo == 3" class="page">
          <ul>
            <li>
              <label>开启mockjs：</label>
              <div class="ui input field">
                <div class="ui radio">
                  <label><input name="openMock" v-model="interfaceInfo.openMock" type="radio" value="0">关闭</label>
                </div>
                <div class="lateral-spacing"></div>
                <div class="ui radio">
                  <label><input name="openMock" v-model="interfaceInfo.openMock" type="radio" value="1">开启</label>
                </div>
              </div>
            </li>
            <li>
              <label>返回状态码：</label>
              <div class="ui input field">
                <input name="code" type="text" v-model="interfaceInfo.code" placeholder="返回状态码，默认0">
              </div>
            </li>
            <li>
              <label>返回参数：</label>
              <div class="ui existing mini-panel segment data-source">
                <div class="ui attached top label"><span class="title">result<span class="right"><a href="http://mockjs.com/examples.html" target="_blank">mockjs</a></span></span></div>
                <code class="ignored code javascript">
                  <textarea rows="16" cols="120" id="result" name="result" v-model="interfaceInfo.result" class="input_section " style="display: none;"></textarea>
                </code>
              </div>
              <label></label>
              <div class="ui input field"><a class="ui button teal" @click="onMock()">mock</a></div>
              <label></label>
              <div class="ui existing mini-panel segment data-source">
                <div class="ui attached top label"><span class="title">mock result</span></div>
                <code class="ignored code javascript">
                  <textarea rows="16" cols="120" id="output" class="input_section " style="display: none;"></textarea>
                </code>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="pageNo == 4" class="page">
          <ul>
            <li>
              <label>二次代理地址：</label>
              <div class="ui input field">
                <input name="proxyURL" type="text" v-model="interfaceInfo.proxyURL" placeholder="二次代理地址(如:http://192.168.1.2)">
              </div>
            </li>
            <li>
              <label>开启二次代理：</label>
              <div class="ui input field">
                <div class="ui radio">
                  <label><input name="openProxy" v-model="interfaceInfo.openProxy" type="radio" value="0">关闭</label>
                </div>
                <div class="lateral-spacing"></div>
                <div class="ui radio">
                  <label><input name="openProxy" v-model="interfaceInfo.openProxy" type="radio" value="1">开启</label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
    <div class="actions">
      <div class="ui deny button">
        取消
      </div>
      <div v-show="pageNo > 1" class="ui teal button" @click="prev()">
        上一步
      </div>
      <div v-show="!isSave" class="ui teal button" @click="next()">
        下一步
      </div>
      <div v-show="isSave" class="ui positive button">
        保存
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import * as MessageBox from '../../common/MessageBox';
import dimmerMixin from '../../../mixins/dimmer';
import CodeMirror from '../../../../node_modules/codemirror/lib/codemirror';
import '../../../../node_modules/codemirror/lib/codemirror.css';
import '../../../../node_modules/codemirror/mode/javascript/javascript.js';
let defaultValue = {
  interfaceInfo: {
    projectId: 1,
    requestType: 'GET',
    openExact: 0,
    params: `var params = {
  //此处填写json格式入参
}`,
    openMock: 0,
    openProxy: 0,
    result: ''
  }
};

export default {
  mixins: [dimmerMixin],
	vuex: {
	},
	data() {
		return {
      interfaceInfo: defaultValue.interfaceInfo,
      paramsEditor: null,
      resultEditor: null,
      outputEditor: null,
      isload: false,
      pageNo: 1
		};
	},
	computed: {
    ...mapGetters({
      projectList: 'projectList'
    }),
    isSave() {
      return this.pageNo == 4;
    },
    getProjectPrefix() {
      for(var i = 0; i < this.projectList.length; i++) {
        if(this.interfaceInfo.projectId == this.projectList[i].id) {
          return this.projectList[i].projectPrefix + "/";
        }
      }
      return "";
    }
	},
  mounted() {
    this.$nextTick(function () {
    });
  },
	methods: {
    ...mapActions(['addInterface', 'editInterface']),
    clearForm() {
      $(this.$el).find("form").form("clear");
    },
    onLoad() {
      if(!this.isload) {
        this.isload = true;
        $(this.$el).find('.select').dropdown();

        this.paramsEditor = CodeMirror.fromTextArea(document.getElementById("params"), {
      	    mode: "javascript",
      	    lineNumbers: true,
      	    lineWrapping: true
      	});
        this.resultEditor = CodeMirror.fromTextArea(document.getElementById("result"), {
      	    mode: "javascript",
      	    lineNumbers: true,
      	    lineWrapping: true
      	});
        this.outputEditor = CodeMirror.fromTextArea(document.getElementById("output"), {
      	    mode: "javascript",
      	    lineNumbers: true,
      	    lineWrapping: true
      	});
      } else {
        this.paramsEditor.setValue(this.interfaceInfo.params);
        this.resultEditor.setValue(this.interfaceInfo.result);
        this.outputEditor.setValue(this.interfaceInfo.output);
      }
      // $("#params").focus();
      // $("#result").focus();
      // $("#output").focus();
    },
    show(interfaceInfo) {
      this.pageNo = 1;
      this.interfaceInfo = defaultValue.interfaceInfo;
      if(interfaceInfo) {
        this.interfaceInfo = interfaceInfo;
      }
      setTimeout(() => {
        this.onLoad();
      }, 10);

      $(this.$el).modal({
        inverted  : false,
        blurring  : true,
        closable  : false,
        transition: 'horizontal flip',
        onDeny    : () => {
          $(document.body).removeClass('blurring');
        },
        onApprove : () => {
          this.dimmer();
          let data = this.checkFour();
          if(!data) {
            this.undimmer();
            return false;
          }
          data.callback = () => {
            this.undimmer();
            this.$parent.query();
            $(this.$el).modal("hide");
            this.clearForm();
            $(document.body).removeClass('blurring');
          };

          if(interfaceInfo) {
            data.id = interfaceInfo.id;
            this.editInterface(data);
          } else {
            this.addInterface(data);
          }
          return false;
        }
      }).modal('show');
    },
    checkOne() {
      var $form = $(this.$el).find("form");
      $form.form({
        on: "blur",
        fields: {
          projectId: 'empty',
          interfaceName: 'empty'
        }
      });
      if(!$form.form('validate form')) {
        return false;
      }
      // return $form.form('get values');
      return true;
    },
    checkTwo() {
      var $form = $(this.$el).find("form");
      $form.form({
        on: "blur",
        fields: {
          requestType: 'empty',
          url: 'empty',
          openExact: 'empty'
        }
      });
      this.interfaceInfo.params = this.paramsEditor.getValue();
      if(!$form.form('validate form')) {
        return false;
      }
      return true;
    },
    checkThree() {
      var $form = $(this.$el).find("form");
      $form.form({
        on: "blur",
        fields: {
          openMock: 'empty',
          code: ['integer'],
          result: 'empty'
        }
      });
      this.interfaceInfo.result = this.resultEditor.getValue();
      $("#result").val(this.resultEditor.getValue());
      if(!$form.form('validate form')) {
        return false;
      }
      return true;
    },
    checkFour() {
      var $form = $(this.$el).find("form");
      // $form.form({
      //   on: "blur",
      //   fields: {
      //     proxyURL: 'empty',
      //     openProxy: 'empty'
      //   }
      // });
      // if(!$form.form('validate form')) {
      //   return false;
      // }
      return $form.form('get values');
    },
    prev() {
      this.pageNo -= 1;
      if(this.pageNo < 1) {
        this.pageNo = 1;
      }
    },
    next() {
      if(this.pageNo == 1) {
        if(!this.checkOne()) {
          return false;
        }
      } else if(this.pageNo == 2) {
        if(!this.checkTwo()) {
          return false;
        }
      } else if(this.pageNo == 3) {
        if(!this.checkThree()) {
          return false;
        }
      }
      this.pageNo += 1;
      if(this.pageNo > 4) {
        this.pageNo = 4;
      }
    },
    onMock() {

    }
	}
}
</script>

<style scoped lang="less">
  .foucus-input {
    width: 0px;
    height: 0px;
    position: absolute;
    top: -1000px;
  }
  .fadeOut {
    display: none;
  }
  .form {
    .page {
      width: 100%;
      height: 400px;
      overflow: auto;
    }

    ul {
      li {
        margin-bottom: 10px;
        > label {
          display: inline-block;
          width: 20%;
          text-align: right;
          font-weight: bold;
        }

        > .input {
          width: 70%;
        }
        .labeled {
          input {
            width: auto;
          }
        }
      }
    }
  }
</style>
