<template>
    <div class="add-addr-container">
        <van-address-edit
            :address-info="addrInfo"
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-area="onChangeArea"
        />
    </div>
</template>

<script>
import { AddressEdit } from 'vant';
import areaList from '@/assets/js/arealist.js';
import { updateaddress, deladdress } from '@/api/index.js';

export default {
    data () {
        return {
            areaList,
            areaCode: '',
            addrInfo: {}
        }
    },
    methods: {
        async onSave(addrInfo) {
            addrInfo.areaCode = this.areaCode;
            addrInfo.country = addrInfo.county;
            addrInfo.isDefault = addrInfo.isDefault ?1 :0;

            let res = await updateaddress(this.addrInfo.id, addrInfo);
            this.$toast(res.message);
            if(res.status === 0){
                this.$router.go(-1);
            }
        },
        async onDelete(){
            let { status, message} = await deladdress(this.addrInfo.id);
            this.$toast(message);
            if(status === 0){
                this.$router.push('/addr');
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
        this.$parent.title = '编辑地址';
        this.addrInfo = JSON.parse(this.$route.params.addrInfo);
        this.areaCode = this.addrInfo.areaCode;
        this.addrInfo.areaCode = this.addrInfo.areaCode.split('-')[2];
    }
}
</script>

<style lang="scss" scoped>
    .add-addr-container {
        margin-bottom: 50px;
    }
</style>
