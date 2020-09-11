<template>
    <div class="cart-container">
        <div v-show="!isEmpty">
            <van-divider>收货地址</van-divider>
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @edit="onEdit"
            />

            <van-divider>购买的商品</van-divider>

            <div class="cartlist">
                <div class="cart" v-for="(item, index) in cartData" :key="item.id">
                    <div class="switchButton">
                        <van-switch v-model="cart[item.id].checked" @change="update(item.id, cart[item.id])" />
                    </div>
                    <div class="thumbImage">
                        <img v-lazy="item.thumb_path">
                    </div>
                    <div class="info">
                        <div class="title">{{ item.title }}</div>
                        <div class="row">
                            <span class="price"> &yen;{{ item.sell_price }} </span>
                            <van-stepper v-model="cart[item.id].count" @change="update(item.id, cart[item.id])" />
                            <van-button type="danger" @click="delCart(index, item.id)">删除</van-button>
                        </div>
                    </div>

                </div>
            </div>
            <van-cell icon="cash-back-record" title="微信支付"/>
            <van-submit-bar :price="$store.getters.totalPrice" button-text="提交订单" @submit="onSubmit">
                <span>共{{$store.getters.totalNumber}}件商品</span>
            </van-submit-bar>
        </div>
        <div class="empty" v-show="isEmpty">
            <h3>亲，您的购物车为空，去 <a href="#/home">首页</a> 逛逛吧！</h3>
            <hr>
            <img src="@/assets/images/car.png">
            <div><a href="#/login">登录</a>后可以同步电脑与手机购物车中的商品</div>
        </div>
    </div>
</template>

<script>
import { Switch, Divider, Stepper, Button, SubmitBar, AddressList, Cell } from 'vant';
import { getshopcarlist, getaddress, commitorder } from '@/api/index.js';
import { genOrderId } from '@/util/tool.js';

export default {
  data () {
    return {
      cartData: [],
      cart: {},
      isEmpty: false,
      chosenAddressId: '1',
      list: []
    }
  },
  methods: {
    async getCartData () {
      const ids = this.$store.getters.getGoodsIds
      if (!ids) {
        this.isEmpty = true
        return
      }
      const { message } = await getshopcarlist(ids);
      this.cartData = message;
    },
    getCart () {
      this.cart = this.$store.getters.getCart;
    },
    delCart (index, id) {
      if(index == -1){
          index = this.cartData.indexOf(v => v.id===id);
      }
      this.$store.commit('delCart', id);
      this.cartData.splice(index, 1);
      if(this.cartData.length === 0){
          this.isEmpty = true;
      }
    },
    async onSubmit () {
        let ids = this.$store.getters.getBuyIds;
        let orderInfo = {
            user_id: this.$store.state.userStore.user.id,
            order_id: genOrderId(),
            address_id: this.list[0].id,
            total_price: this.$store.getters.totalPrice/100,
            number: this.$store.getters.totalNumber,
            goods_ids: ids.join()
        }

        let  _this = this;
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:3000,
            onClose(){
                Dialog.alert({
                    message: '支付是否完成',
                }).then(() => {
                    _this.$router.push('/order');
                });
            }
        });
        let res = await commitorder(orderInfo);
        var weixinpayurl = res.data;
        location.href = weixinpayurl;
        ids.map(v => {
            this.delCart(-1, v);
        });
    },
    onEdit (item) {
      this.$router.push(`/editAddr/${JSON.stringify(item)}`);
    },
    update (id, car) {
      this.$store.commit('update', { id, checked: car.checked, count: car.count })
    },
    async getaddrlist(){
        if(!this.$store.state.userStore.user){
            this.$toast('当前状态未登录');
            return;
        }
        let list = await getaddress(this.$store.state.userStore.user.id);
        list.map(v => {
            v.address = `${(v.province !== v.city ?v.province :'') + v.city+v.country} ${v.addressDetail}`;
            v.isDefault = !!v.isDefault;
            if(v.isDefault){
                this.chosenAddressId = v.id;
            }
        });
        this.list = list;
    }
  },
  created () {
    this.$parent.title = '我的购物车';
    this.getCartData();
    this.getCart();
    this.getaddrlist();
  },
  components: {
    'van-switch': Switch,
    'van-divider': Divider,
    'van-stepper': Stepper,
    'van-button': Button,
    'van-submit-bar': SubmitBar,
    'van-address-list': AddressList,
    'van-cell': Cell
  }
}
</script>

<style lang="scss" scoped>
    .cart-container {
        margin-bottom: 104px;
        .van-divider {
            margin: 2px;
            color: #6f7370;
            border-color: #545e6c;
            font-size: 16px;
        }
        .van-address-list {
            padding: 12px;
            .van-address-list__bottom {
                display: none;
            }
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

        .van-submit-bar {
            bottom: 50px;
        }

        .empty {
            padding-top: 20px;
            text-align: center;
            h3 {
                color: #333;
            }
            img {
                width: 40%;
            }
        }
    }
</style>
