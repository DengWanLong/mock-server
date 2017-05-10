import './login.less';
import 'animate.css';

import Vue from 'vue';
import '../../libs/semantic-ui/dist/semantic.css';
// import '../../../node_modules/semantic-ui-css/semantic.css';
import '../../libs/semantic-ui/dist/semantic.min.js';
import store from '../store';
import { mapGetters, mapActions } from 'vuex';
import * as MessageBox from '../common/MessageBox';

// Vue.config.productionTip = false;
Vue.config.debug = true;

new Vue({
    el: '#app',
    store: store,
    data() {
      return {
        userName: "",
        password: ""
      }
    },
    mounted() {
      this.$nextTick(() => {

      });
    },
    methods: {
        ...mapActions(['login']),
        validate() {
          // let $form = $(this.$el).find("form");
          // $form.form({
          //   fields: {
          //     userName: ['empty'],
          //     password: ['empty']
          //   }
          // });
          // $form.find(".field").addClass("error");
          // return $form.form('is valid');
          if(!this.userName) {
            MessageBox.toast('用户名不能为空');
            return false;
          }
          if(!this.password) {
            MessageBox.toast('密码不能为空');
            return false;
          }
          return true;
        },
        onLogin() {
          if(this.validate()) {
            this.login({userName: this.userName, password: this.password});
          }
        }
    }
});
