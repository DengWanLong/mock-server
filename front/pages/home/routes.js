import Vue from 'vue';
import Router from 'vue-router';
import IndexMain from './IndexMain.vue';
import ProjectMain from './project/ProjectMain.vue';
import InterfaceMain from './interface/InterfaceMain.vue';

Vue.use(Router);

export default new Router({
  routes: [
      {path: '/', name: 'index', component: IndexMain},
      {path: '/project', name: 'project', component: ProjectMain},
      {path: '/interface/:projectId/:projectName', name: 'interface', component: InterfaceMain}
  ]
});
