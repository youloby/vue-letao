<template>
    <div class="container">

        <div class="header" v-if="isHome">
            <img src="@/assets/images/logo.png">
            <van-search placeholder="请输入搜索关键词" />
        </div>
        <div class="head" v-if="!isHome">
            <van-sticky>
                <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
            </van-sticky>
        </div>

        <div class="content">
            <router-view></router-view>
        </div>


        <van-tabbar v-model="active" v-show="!isUser">
            <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="cart-o" to="/cart" :badge="cartCount">购物车</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/user">我的乐淘</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Search, Tabbar, TabbarItem, NavBar, Toast, Sticky } from 'vant';

export default {
    data(){
        return {
            active: 0,
            title: "",
            cartCount: 0,
            userPath: ['/user', '/addr']
        }
    },
    computed: {
        isHome(){
            return this.$route.path == '/home';
        },
        isUser(){
            return this.userPath.includes(this.$route.path);
        }
    },
    components: {
        "van-search": Search,
        "van-tabbar": Tabbar,
        "van-tabbar-item": TabbarItem,
        "van-nav-bar": NavBar,
        "van-sticky": Sticky
    },
    methods: {
        getCartCount(){
            this.cartCount = 0;
            let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
            cartlist.map(cart => this.cartCount +=cart.count);
            return this.cartCount;
        }
    },
    beforeCreate(){
        document.getElementsByTagName('body')[0].setAttribute("style", "background-color:#eee");
    },
    created(){
        this.getCartCount();
    }
}
</script>

<style lang="scss" scoped>
    .container {
        max-width: 750px;
        min-width: 320px;
        margin: auto;

        .header {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 750px;
            height: 54px;
            background-color: #fff;
            img {
                width: 44px;
                height: 44px;
                margin-left: 4px;
            }

            .van-search {
                width: 90%;
                height: 54px;
            }
        }

        .fixed {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 750px;
            z-index: 999;
        }
    }

</style>
