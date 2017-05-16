<template>
  <div class="ui modal small">
    <div class="header">新增项目</div>
    <div class="content">
      <form class="ui form">
         <ul>
           <li><label>项目名称：</label><div class="ui input field"><input name="projectName" type="text" :value="projectInfo.projectName" placeholder="项目名称"></div></li>
           <li><label>项目前缀：</label><div class="ui input field"><input name="projectPrefix" type="text" :value="projectInfo.projectPrefix" placeholder="项目接口前缀(默认：/api/)"></div></li>
           <li><label>二次代理地址：</label><div class="ui input field"><input name="proxyURL" type="text" :value="projectInfo.proxyURL" placeholder="二次代理地址(如:http://192.168.1.2)"></div></li>
         </ul>
      </form>
    </div>
    <div class="actions">
      <div class="ui deny button">
        取消
      </div>
      <div class="ui positive button">
        确定
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import * as MessageBox from '../../common/MessageBox';
import dimmerMixin from '../../../mixins/dimmer';

export default {
  mixins: [dimmerMixin],
	vuex: {
	},
	data() {
		return {
      projectInfo: {}
		};
	},
  mounted() {
    this.$nextTick(function () {
    })
  },
	methods: {
    ...mapActions(['addProject', 'editProject']),
    onValidate() {
      var $form = $(this.$el).find("form");
      $form.form({
        on: "blur",
        fields: {
          projectName: 'empty',
          projectPrefix: 'empty',
          proxyURL: 'empty'
        }
      });
      if(!$form.form('validate form')) {
        return false;
      }
      return $form.form('get values');
    },
    clearForm() {
      $(this.$el).find("form").form("clear");
    },
    show(projectInfo) {
      this.projectInfo = {};
      if(projectInfo) {
        this.projectInfo = projectInfo;
      }
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
          let data = this.onValidate();
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

          if(projectInfo) {
            data.id = projectInfo.id;
            this.editProject(data);
          } else {
            this.addProject(data);
          }
          return false;
        }
      }).modal('show');
    }
	}
}
</script>

<style scoped lang="less">
  .form {
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
      }
    }
  }
</style>
