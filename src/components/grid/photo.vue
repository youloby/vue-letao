<template>
    <div class="photo-containter">
        <van-tree-select height="100vh" :items="items"
        @click-nav="getcatelist(activeIndex, items[activeIndex].id)"
        :active-id.sync="activeIds"
        :main-active-index.sync="activeIndex">
            <template #content>
                <post :children="items[activeIndex].children" @showPhoto="showPhoto" v-if="isShow"></post>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
import { TreeSelect, ImagePreview } from 'vant';
import { getcategory, getcatelist, getthumbimages } from '@/api/index.js';
import post from '@/components/common/post.vue';
export default {
    data() {
        return {
            activeIds: 1,
            activeIndex: 0,
            isShow: false,
            items: []
        };
    },
    components: {
        "van-tree-select": TreeSelect,
        post
    },
    methods: {
        async getcategoryData(){
            let { message } = await getcategory();
            this.items = message.map(v => {
                return {id:v.id, text: v.title}
            });
            this.getcatelist(0, this.items[0].id);
        },
        async getcatelist(index, id){
            if(this.items[index].children){
                return;
            }
            this.isShow = false;
            let { message } = await getcatelist(id);
            this.items[index].children = message.map(v => v);
            this.isShow = true;
        },
        async showPhoto(id){
            let { message } = await getthumbimages(id);
            let imgs = message.map(v => v.src);
            if(!imgs.length){
                this.$toast('还没有上传图片哦~');
                return;
            }
            ImagePreview(imgs);
        }
    },
    created(){
        this.$parent.title = "美图欣赏";
        this.getcategoryData();
    }
}
</script>

<style lang="scss" scoped>

</style>
