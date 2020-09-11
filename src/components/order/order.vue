<template>
    <div class="order-container">
        <van-tabs v-model="active" sticky animated>
            <van-tab v-for="order in orderMsg" :title="order.title" :key="order.status">
                <van-card v-for="item in getOrder(order.status)" :key="item.id"
                    :price="item.total_price+'.00'"
                    :desc="'共 '+ item.number +' 件商品'"
                    :title="item.goods[0].title"
                    :thumb="item.goods[0].thumb_path"
                >
                <template #tags>
                    <van-tag plain type="danger">付款方式：微信支付</van-tag>
                </template>
                <template #footer>
                    <van-tag size="large" :type="showStatus(item.status).style">{{ showStatus(item.status).text }}</van-tag>
                    <van-button size="mini" type="danger">联系客服</van-button>
                </template>
                </van-card>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Card, Tag, Button } from 'vant';
import { userorder, getshopcarlist, checktoken } from '@/api/index.js';

export default {
    data(){
        return {
            active: 0,
            orderMsg: [
                {title:'全部', status:'all'},
                {title:'待付款', status:'0'},
                {title:'待收货', status:'1'},
                {title:'已完成', status:'2'}
                ],
            orderlist: []
        }
    },
    methods: {
        async getOrderList(){
            let orderlist = await userorder(this.$store.state.userStore.user.id);
                if(Array.isArray(orderlist)){
                let pros = [];
                orderlist.map(v => {
                    pros.push(getshopcarlist(v.goods_ids));
                });
                let goodslist = await Promise.all(pros);
                orderlist.map((v, index) => {
                    v.goods = goodslist[index].message;
                });
                this.orderlist = orderlist;
            }else {
                this.$toast(orderlist.message);
            }
        },
        getOrder(status){
            if(status === 'all'){
                return this.orderlist;
            }
            let orderlist = [];
            this.orderlist.map(v => {
                if(v.status == status){
                    orderlist.push(v);
                }
            });
            return orderlist;
        },
        showStatus(status){
            let statusMap = new Map([
                ['0', {text: '未付款', style: 'danger'}],
                ['1', {text: '已付款', style: 'success'}],
                ['2', {text: '已完成', style: 'default'}],
            ]);
            return statusMap.get(status.toString());
        }
    },
    components: {
        "van-tab": Tab,
        "van-tabs": Tabs,
        "van-card": Card,
        "van-tag": Tag,
        "van-button": Button
    },
    async created(){
        await checktoken();
        this.$parent.title = "我的订单";
        this.getOrderList();
    }
}
</script>

<style lang="scss" scoped>

</style>
