<template>
    <div class="news-detail-container">
        <div class="news-detail">
            <h3 class="title">{{ newsData.title }}</h3>
            <div class="time_click">
                <span class="time">发布时间：{{ newsData.add_time | formatDate('YYYY-MM-DD HH:mm:ss') }}</span>
                <span class="click">阅读 {{ newsData.click }} 次</span>
            </div>
            <div class="content" v-html="newsData.content"></div>
        </div>
        <div class="comments">
            <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="有爱评论，说点好听的~"
                show-word-limit
            />
            <van-button type="info" @click="postcomment" block>评论</van-button>
            <div class="comment-area">
                <div class="comment" v-for="item in comments" :key="item.id">
                    <div class="message">
                        <div>{{ item.user_name }}：{{ item.content }}</div>
                        <div>评论时间：{{ item.add_time | formatDate('YYYY-MM-DD hh:mm') }}</div>
                    </div>
                </div>
            </div>
            <van-button color="red" plain :loading="isLoad" loading-text="加载中..." @click="getCommentData">查看更多</van-button>
        </div>

    </div>
</template>

<script>
import { Field, Button, Toast } from 'vant';
import { getnewsData, getcomments, postcomment } from '@/api/index.js';
export default {
    data(){
        return {
            newsData: "",
            comments: [],
            pageIndex: 0,
            message: "",
            isLoad: false,
            hasComment: true
        }
    },
    methods: {
        async getData(){
            let newsData = await getnewsData(this.$route.params.newsId);
            this.newsData = newsData.message[0];
        },
        async getCommentData(){
            if(!this.hasComment){
                Toast("已获取所有评论");
                return;
            }
            this.isLoad = true;
            let comments = await getcomments(this.$route.params.newsId, ++this.pageIndex);
            this.hasComment = (comments.message.length != 0);
            this.comments = this.comments.concat(comments.message);
            this.isLoad = false;
        },
        async postcomment(){
            let msg = this.message.trim();
            if(!msg){
                this.message = "";
                return;
            }
            let { status, message, insertId } = await postcomment(this.$route.params.newsId, this.message);
            if(status != 0){
                Toast(message);
                return;
            }
            this.comments.unshift({user_name:"匿名用户", content:this.message, add_time:new Date(), id:insertId});
            this.message = "";
        }
    },
    created(){
        this.$parent.title = "新闻详情";
        this.getData();
        this.getCommentData();
    },
    components: {
        "van-field": Field,
        "van-button": Button
    }
}
</script>

<style lang="scss" scoped>
    .news-detail-container {
        padding: 0 10px;
        margin-bottom: 50px;
        background-color: #faf9f9;

        .news-detail {
            .title {
                padding: 10px 0;
                margin: 16px 0;
                text-align: center;
                font-size: 16px;
                color: #404040;
            }
            .time_click {
                display: flex;
                justify-content: space-between;
                padding-bottom: 5px;
                border-bottom: 1px solid #888;
                font-size: 13px;
                color: #888;
            }
            /deep/ .content {
                table {
                    width: 100%;
                    img {
                        width: 100%;
                    }
                }
                img {
                    width: 100%;
                }
            }
        }
        .comments {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .comment {
                padding: 5px 1px;
                font-size: 12px;
                .message {
                    background-color: #e8e8e8;
                }
            }
        }
    }
</style>
