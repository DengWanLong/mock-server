import './index.less';
import 'animate.css';

import Vue from 'vue';
import routes from './routes';
// import $ from 'jquery';
import store from '../store';
import '../../libs/semantic-ui/dist/semantic.css';
import '../../libs/semantic-ui/dist/semantic.min.js';

// Vue.config.productionTip = false;
Vue.config.debug = true;

new Vue({
    el: '#app',
    store: store,
    router: routes,
    mounted() {
      this.$nextTick(() => {
        $(".left-menu .home").click(function(){
          routes.push({ name: 'index' })
        });
        $(".left-menu .project").click(function(){
          routes.push({ name: 'project' })
        });
        $(".left-menu .interface").click(function(){
          routes.push({ name: 'interface', params: { projectId: 0 , projectName: '所有项目'} })
        });
      });
    }
});
setTimeout(() => $('#loading').remove(), 600);
