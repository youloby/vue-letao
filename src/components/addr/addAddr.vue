<template>
    <div class="add-addr-container">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-area="onChangeArea"
        />
    </div>
</template>

<script>
import { AddressEdit } from 'vant';
import areaList from '@/assets/js/arealist.js';
import { addaddress } from '@/api/index.js';

export default {
    data () {
        return {
            areaList,
            areaCode: ''
        }
    },
    methods: {
        async onSave(addrInfo) {
            addrInfo.areaCode = this.areaCode;
            addrInfo.country = addrInfo.county;
            addrInfo.isDefault = addrInfo.isDefault ?1 :0;

            let userId = this.$store.state.userStore.user.id;
            let res = await addaddress(userId, addrInfo);
            this.$toast(res.message);
            if(res.status === 0){
                this.$router.go(-1);
            }
        },
        onChangeArea(values) {
            this.areaCode = values.map(v => v.code).join('-');
        }
    },
    components: {
        'van-address-edit': AddressEdit
    },
    created () {
        this.$parent.title = '添加地址';
    }
}
</script>

<style lang="scss" scoped>
    .add-addr-container {
        margin-bottom: 50px;
    }
</style>
