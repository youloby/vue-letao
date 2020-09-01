<template>
    <div class="goods-detail-container">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in imgs" :key="item.src">
                <img :src="item.src">
            </van-swipe-item>
            <van-swipe-item v-if="isEmpty">
                <van-empty image="error" />
            </van-swipe-item>
        </van-swipe>

        <div class="info">
            <div class="goodsName"> {{ goods.title }}</div>
            <van-divider />
            <div class="price">
                <s class="market">市场价：&yen;{{ goods.market_price }}</s>
                <span class="sell">本店价：<span class="value">&yen;{{ goods.sell_price }}</span></span>
            </div>
            <div class="buyNumber">
                <span>购买数量：</span>
                <van-stepper v-model="count" />
            </div>
        </div>

        <div class="item">
            <van-divider>其他信息</van-divider>
            <div class="item-info">
                <div>商品货号：{{ goods.goods_no }}</div>
                <div>库存情况：{{ goods.stock_quantity }}件</div>
                <div>上架时间：{{ goods.add_time | formatDate('YYYY-MM-DD') }}</div>
            </div>
        </div>
        <div class="item">
            <van-divider>介绍</van-divider>
            <div class="item-info" v-html="goods.content"></div>
        </div>

        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" dot />
            <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartCount" to="/cart" />
            <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import { Swipe, SwipeItem, Divider, Stepper, GoodsAction, GoodsActionIcon, GoodsActionButton, Empty } from 'vant';
import { getgoodsinfo, getthumbimages } from '@/api/index.js';
export default {
    data(){
        return {
            imgs: [],
            goods: "",
            count: 1,
            cartCount: 0,
            isEmpty: false
        }
    },
    methods: {
        async getgoodsData(){
            let goodsId = this.$route.params.goodsId;

            let {message} = await getthumbimages(goodsId);
            let isLength = message.length!=0;
            this.imgs = isLength ?message :[];
            this.isEmpty = !isLength;

            let info = await getgoodsinfo(goodsId);
            this.goods = info.message;

        },
        addCart(){
            let cartlist = JSON.parse(localStorage.getItem("cartlist")) || [];
            let index = cartlist.findIndex(cart => cart.id == this.goods.id);
            if(index == -1){
                cartlist.push({'id': this.goods.id, 'count': this.count, 'checked':false});
            } else{
                cartlist[index].count += this.count;
            }
            localStorage.setItem("cartlist", JSON.stringify(cartlist));
            this.getCartCount();
        },
        getCartCount(){
            this.cartCount = this.$parent.getCartCount();
        }
    },
    created(){
        this.$parent.title = "商品详情";
        this.getgoodsData();
        this.getCartCount();
    },
    components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        "van-divider": Divider,
        "van-stepper": Stepper,
        "van-goods-action": GoodsAction,
        "van-goods-action-icon": GoodsActionIcon,
        "van-goods-action-button": GoodsActionButton,
        "van-empty": Empty
    }
}
</script>

<style lang="scss" scoped>
    .goods-detail-container {
        padding: 5px 5px 100px 5px;

        .my-swipe .van-swipe-item, .van-empty {
            height: 240px;
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;
            border-radius: 5px;
            background-color: #fff;
            img {
                width: 245px;
                height: 240px;
            }
        }

        .info {
            padding: 8px;
            margin: 10px 0;
            font-size: 16px;
            border-radius: 5px;
            background-color: #fff;
            color: #333;
            .price {
                margin-bottom: 15px;
                .market {
                    margin-right: 20px;
                }
                .sell {
                    .value {
                        color: red;
                        font-weight: 700;
                    }
                }
            }
            .buyNumber {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
        }

        .item {
            padding: 8px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #fff;
            .item-info {
                color: #333;
                font-size: 16px;
                /deep/ img {
                    width: 100%;
                }
                /deep/ table {
                    width: 100%;
                    img {
                        width: 100%;
                    }
                }
            }
        }

        .van-goods-action {
            position: fixed;
            bottom: 50px;
            z-index: 999;
        }
    }
</style>
