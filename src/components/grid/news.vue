<template>
    <div class="news-container">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="newslist">
                <div class="news" v-for="item in newsData" :key="item.id" @click="getNewsDetail(item.id)">
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <div class="title">{{ item.title }}</div>
                        <div class="time_click">
                            <span>发布时间 {{ item.add_time | formatDate('YYYY-MM-DD HH:mm') }}</span>
                            <span>点击：{{ item.click }} 次</span>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { PullRefresh, Toast, List } from 'vant'
import { getnewslistData } from '@/api/index.js'
export default {
  data () {
    return {
      page: 0,
      pagesize: 6,
      newsData: [],
      isLoading: false,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getnewslist () {
      if (this.finished) {
        return
      }
      const newslistData = await getnewslistData(++this.page, this.pagesize)
      if (newslistData.message.length === 0) {
        this.finished = true
      }
      this.newsData = this.page === 1 ? newslistData.message : this.newsData.concat(newslistData.message)
    },
    onRefresh () {
      setTimeout(() => {
        this.page = 0
        this.newsData.splice(6, this.newsData.length)
        this.finished = false
        this.getnewslist()
        Toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    onLoad () {
      setTimeout(() => {
        this.getnewslist()
        this.loading = false
      }, 1000)
    },
    getNewsDetail (newsId) {
      this.$router.push(`/newsDetail/${newsId}`)
    }
  },
  components: {
    'van-pull-refresh': PullRefresh,
    'van-list': List
  },
  created () {
    this.$parent.title = '新闻列表'
    this.getnewslist()
  }
}
</script>

<style lang="scss" scoped>
    .news-container {
        padding: 2px;
        margin-bottom: 50px;
        .newslist {
            .news {
                display: flex;
                border-bottom: 1px solid #ccc;
                margin-top: 2px;
                img {
                    width: 100px;
                    height: 100px;
                }
                .info {
                    padding: 2px;
                    width: 100%;
                    .title {
                        margin: 13px 0 14px;
                        font-size: 13px;
                        font-weight: bold;
                        color: #000;
                    }
                    .time_click {
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        color: #888;
                    }
                }
            }
        }
    }
</style>
