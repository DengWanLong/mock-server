import Vue from 'vue';
import Router from 'vue-router';
import IndexMain from './IndexMain.vue';

Vue.use(Router);

export default new Router({
  routes: [
      {path: '/', name: 'index', component: IndexMain}
  ]
});