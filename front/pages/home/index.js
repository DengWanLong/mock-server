import './index.less';
import 'animate.css';

import Vue from 'vue';
import routes from './routes';
// import $ from 'jquery';
import store from '../store';
import '../../libs/semantic-ui/dist/semantic.min.js';

// Vue.config.productionTip = false;
Vue.config.debug = true;

new Vue({
    el: '#app',
    store: store,
    router: routes
});
setTimeout(() => $('#loading').remove(), 600);
