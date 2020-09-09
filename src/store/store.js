import Vue from 'vue';
import Vuex from 'vuex';
import cartStore from './cartStore';
import userStore from './userStore';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isPending: false
    },
    modules: {
        cartStore,
        userStore
    },
    mutations: {
        changePending(state, isPending){
            state.isPending = isPending;
        }
    }
});

export default store;
