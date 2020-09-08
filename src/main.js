import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import axios from 'axios'

import { Lazyload } from 'vant'

import '@/util/filter.js'

import Vuex from 'vuex';
import cartStore from './store/cartStore';
import userStore from './store/userStore';
import toolStore from './store/toolStore';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        cartStore,
        userStore,
        toolStore
    }
})

Vue.config.productionTip = false
Vue.prototype.$api = axios
Vue.use(Lazyload)
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
