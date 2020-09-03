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
import addr from '@/components/user/addr.vue'
import addAddr from '@/components/user/addAddr.vue'
import login from '@/components/user/login.vue'
import register from '@/components/user/register.vue'

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
    { path: '/login', component: login },
    { path: '/register', component: register }
  ]
})

export default router
