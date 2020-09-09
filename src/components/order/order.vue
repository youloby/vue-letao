<template>
    <div class="order-container">
        <van-tabs v-model="active" sticky animated>
            <van-tab v-for="(item, index) in title" :title="item" :key="index">
                <van-card
                    num="2"
                    price="2.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Card} from 'vant';

export default {
    data(){
        return {
            active: 0,
            title: ['全部', '待付款', '待收货', '已完成']
        }
    },
    components: {
        "van-tab": Tab,
        "van-tabs": Tabs,
        "van-card": Card
    },
    created(){
        this.$parent.title = "我的订单";
    }
}
</script>

<style lang="scss" scoped>

</style>
