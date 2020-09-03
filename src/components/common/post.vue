<template>
    <div class="post-container">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="postlist">
            <router-link tag="div" class="post" v-for="item in children" :key="item.id" :to="'/newsDetail/'+item.id">
                <img v-lazy="item.img_url" @click.stop="showPhoto(item.id)">
                <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div class="zhaiyao">
                        {{ item.zhaiyao }}
                    </div>
                </div>
            </router-link>
        </van-list>
    </div>
</template>

<script>
import { List } from 'vant'
export default {
  props: ['children'],
  data () {
    return {
      loading: false,
      finished: false
    }
  },
  components: {
    'van-list': List
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        // this.getnewslist();
        // this.loading = false;
        this.finished = true
      }, 1000)
    },
    showPhoto (id) {
      this.$emit('showPhoto', id)
    }
  }
}
</script>

<style lang="scss" scoped>
    .post-container {
        padding: 2px;
        margin-bottom: 50px;
        .postlist {
            .post {
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

                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .zhaiyao {
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        color: #888;

                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
