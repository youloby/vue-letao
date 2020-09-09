<template>
    <div class="home-container">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in loopData" :key="item.img">
                <img :src="item.img" class="swipe-img">
            </van-swipe-item>
        </van-swipe>

        <van-grid :column-num="4" :border="false">
            <van-grid-item icon="photo-o" text="文字" v-for="item in gridData" :key="item.img" @click="getElecList(item.url)">
                <img :src="item.img" class="grid-img">
                <span>{{ item.font }}</span>
            </van-grid-item>
        </van-grid>

        <div class="recommend">
            <van-divider :style="{ color: '#333', borderColor: '#B0B4BA'}" :hairline="false">为你推荐</van-divider>

            <div class="reList">
                <div v-for="item in pushData" :key="item.id" class="goods" @click="getGoodsDetail(item.id)">
                    <img v-lazy="item.img_url" class="goods-img">
                    <div class="text">
                        <div class="title">{{ item.title }}</div>
                        <div class="info">
                            <span class="price">&yen;{{ item.sell_price }}</span>
                            <span class="buy">{{ item.buy }}人已购买</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { Swipe, SwipeItem, Grid, GridItem, Divider } from 'vant'
import { carouselData, recommendData } from '@/api/index.js'

export default {
    name: "home-component",
  data () {
    return {
      loopData: [],
      gridData: [
        { img: require('@/assets/images/menu10.png'), font: '数码电器', url: '/elec' },
        { img: require('@/assets/images/menu19.png'), font: '乐淘头条', url: '/news' },
        { img: require('@/assets/images/menu18.png'), font: '美图欣赏', url: '/photo' },
        { img: require('@/assets/images/menu15.png'), font: '乐淘服饰', url: '/elec' },
        { img: require('@/assets/images/menu12.png'), font: '9.9元拼单', url: '/elec' },
        { img: require('@/assets/images/menu13.png'), font: '乐淘超市', url: '/elec' },
        { img: require('@/assets/images/menu16.png'), font: '物流查询', url: '/elec' },
        { img: require('@/assets/images/menu17.png'), font: '全部', url: '/elec' }
      ],
      pushData: []
    }
  },
  methods: {
    headerFixed () {
      const header = document.querySelector('.header')
      if (!header) {
        return
      }
      window.onscroll = function (e) {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if (scrollTop >= header.offsetHeight) {
          header.classList.add('fixed')
        } else {
          header.classList.remove('fixed')
        }
      }
    },
    async carousel () {
      // let res = await this.$api.get("http://api.w0824.com/api/getlunbo");
      // this.datas = res.data.message;
      const datas = await carouselData()
      this.loopData = datas.message
    },
    async recommend () {
      const datas = await recommendData()
      this.pushData = datas.message
    },
    getElecList (url) {
      this.$router.push(url)
    },
    getGoodsDetail (goodsId) {
      this.$router.push(`/goodsDetail/${goodsId}`)
    }
  },
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-grid': Grid,
    'van-grid-item': GridItem,
    'van-divider': Divider
  },
  created () {
    this.$nextTick(function () {
      this.headerFixed()
    })
    this.carousel()
    this.recommend()
  }
}
</script>

<style lang="scss" scoped>
    .home-container {
        margin-top: 54px;
        margin-bottom: 50px;
        .my-swipe .van-swipe-item {
            width: 320px;
            height: 200px;
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;
            .swipe-img {
                width: 100%;
                height: 200px;
            }
        }
        .van-grid {
            .van-grid-item {
                background-color: #fff;
                .grid-img {
                    width: 32px;
                    height: 32px;
                }
                span {
                    margin-top: 3px;
                    color: #524949;
                }
            }
        }

        .recommend {
            padding: 0 8px;

            .reList {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .goods {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 48%;
                    margin: 4px 0;
                    border-radius: 6px;
                    background-color: #fff;
                    overflow: hidden;
                    .goods-img {
                        width: 100%;
                    }
                    .text{
                        font-size: 12px;
                        padding: 0 4px;
                        .title {
                            color: #333;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }

                        .info {
                            padding: 10px 0;
                            .price {
                                font-size: 14px;
                                color: #f50;
                            }
                            .buy {
                                margin-left: 10px;
                                color: #999;
                            }
                        }

                    }
                }
            }
        }
    }
</style>
