import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/components/tabbar/home.vue'
import cart from '@/components/tabbar/cart.vue'
import user from '@/components/tabbar/user.vue'
import elec from '@/components/grid/elec.vue'
import news from '@/components/grid/news.vue'
import photo from '@/components/grid/photo.vue'
import newsDetail from '@/components/detail/newsDetail.vue'
import goodsDetail from '@/components/detail/goodsDetail.vue'
import addr from '@/components/addr/addr.vue'
import addAddr from '@/components/addr/addAddr.vue'
import editAddr from '@/components/addr/editAddr.vue'
import login from '@/components/user/login.vue'
import register from '@/components/user/register.vue'
import order from '@/components/order/order.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/cart', component: cart },
    { path: '/user', component: user },
    { path: '/elec', component: elec },
    { path: '/news', component: news },
    { path: '/photo', component: photo },
    { path: '/newsDetail/:newsId', component: newsDetail },
    { path: '/goodsDetail/:goodsId', component: goodsDetail },
    { path: '/addr', component: addr },
    { path: '/addAddr', component: addAddr },
    { path: '/editAddr/:addrInfo', component: editAddr },
    { path: '/login', component: login },
    { path: '/register', component: register },
    { path: '/order', component: order }
  ]
});

router.beforeEach((to, from, next) => {
    next();
});

export default router
