import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.$api = axios;

import { Lazyload } from 'vant';
Vue.use(Lazyload);

import '@/util/filter.js';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
