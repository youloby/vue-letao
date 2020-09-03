<template>
    <div class="elec-container">
        <div class="goodsList">
            <div class="goods" v-for="item in goodsData" :key="item.id" @click="getGoodsDetail(item.id)">
                <img v-lazy="item.img_url">
                <div class="title">{{ item.title }}</div>
                <div class="info">
                    <div class="price">
                        <span class="now">&yen;{{ item.sell_price }}</span>
                        <s class="old">&yen;{{ item.stock_quantity }}</s>
                    </div>
                    <div class="hot">
                        <span>热卖中</span>
                        <span>剩 {{ item.stock_quantity }} 件</span>
                    </div>
                </div>
            </div>
            <van-button type="danger" size="large" @click="getGoodsListData()"
            :loading="isLoad" loading-text="加载中...">加载更多</van-button>
        </div>
    </div>
</template>

<script>
import { Button, Toast } from 'vant'
import { getgoodsListData } from '@/api/index.js'
export default {
  data () {
    return {
      pageindex: 0,
      goodsData: [],
      isLoad: false,
      hasData: true
    }
  },
  methods: {
    async getGoodsListData () {
      if (!this.hasData) {
        Toast('已获取所有商品')
        return
      }
      this.isLoad = true
      const { message } = await getgoodsListData(++this.pageindex)
      this.hasData = (message.length !== 0)
      this.goodsData = this.goodsData.concat(message)
      this.isLoad = false
    },
    getGoodsDetail (goodsId) {
      this.$router.push(`/goodsDetail/${goodsId}`)
    }
  },
  components: {
    'van-button': Button
  },
  created () {
    this.$parent.title = '商品列表'
    this.getGoodsListData()
  }
}
</script>

<style lang="scss" scoped>
    .elec-container {
        margin-bottom: 50px;
        .goodsList {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 5px;
            .goods {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 1px;
                width: 48%;
                margin-bottom: 5px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0 5px #ccc;
                background-color: #fff;
                img {
                    width: 100%;
                    height: 58%;
                }
                .title {
                    padding: 2px;
                    font-size: 12px;
                    color: #333;

                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .info {
                    padding: 3px 5px;
                    .price {
                        .now {
                            font-size: 16px;
                            color: red;
                            font-weight: 700;
                        }
                        .old {
                            margin-left: 8px;
                            font-size: 12px;
                            color: #565252;
                        }
                    }
                    .hot {
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        color: #565252;
                    }
                }
            }
            .van-button {
                width: 100%;
                height: 50px;
                border: 1px inherit #000;
            }
        }
    }
</style>
