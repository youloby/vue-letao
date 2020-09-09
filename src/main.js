import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import axios from 'axios'

import { Lazyload } from 'vant'

import '@/util/filter.js'
import store from './store/store.js'

Vue.config.productionTip = false
Vue.prototype.$api = axios
Vue.use(Lazyload)
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
