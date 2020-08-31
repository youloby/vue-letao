<template>
    <div class="cart-container">

        <van-divider>收货地址</van-divider>

        <van-divider>购买的商品</van-divider>

        <div class="cartlist">
            <div class="cart" v-for="(item, index) in cartData" :key="index">
                <div class="switchButton">
                    <van-switch v-model="cartlist[index].checked" @change="update" />
                </div>
                <div class="thumbImage">
                    <img v-lazy="item.thumb_path">
                </div>
                <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div class="row">
                        <span class="price"> &yen;{{ item.sell_price }} </span>
                        <van-stepper v-model="cartlist[index].count" @change="update" />
                        <van-button type="danger" @click="delCart(index)">删除</van-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { Switch, Divider, Stepper, Button, } from 'vant';
import { getshopcarlist } from '@/api/index.js';
export default {
    data(){
        return {
            cartlist: [],
            cartData: []
        }
    },
    methods: {
        getCartlist(){
            this.cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
        },
        async getCartlistData(){
            let ids = this.cartlist.map(cart => cart.id);
            if(ids.length == 0){
                return;
            }
            let cartlistData = await getshopcarlist(ids.join());
            this.cartData = cartlistData.message;
        },
        delCart(index){
            this.cartlist.splice(index, 1);
            this.cartData.splice(index, 1);
            this.update();
        },
        update(){
            localStorage.setItem("cartlist", JSON.stringify(this.cartlist));
            this.$parent.getCartCount();
        }
    },
    created(){
        this.$parent.title = "我的购物车";
        this.getCartlist();
        this.getCartlistData();
    },
     components: {
         "van-switch": Switch,
         "van-divider": Divider,
         "van-stepper": Stepper,
         "van-button": Button
     }
}
</script>

<style lang="scss" scoped>
    .cart-container {
        margin-bottom: 50px;
        .van-divider {
            margin: 2px;
            color: #6f7370;
            border-color: #545e6c;
        }
        .cartlist {
            padding: 10px 5px;
            .cart {
                display: flex;
                align-items: center;
                padding: 8px;
                margin-bottom: 10px;
                background-color: #fff;

                .thumbImage {
                    margin: 3px;
                    img {
                        width: 50px;
                    }
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .title {
                        color: #000;
                        font-size: 16px;

                        overflow: hidden;
                        text-overflow:ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    .row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .price {
                            color: red;
                            font-weight: 700;
                        }
                    }
                }
            }
        }

    }
</style>
