<template>
    <div class="add-addr-container">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
        />
    </div>
</template>

<script>
import { AddressEdit, Toast } from 'vant'
import areaList from '@/assets/js/arealist.js'
export default {
  created () {
    this.$parent.title = '添加地址'
  },
  data () {
    return {
      areaList
    }
  },
  methods: {
    onSave () {
      Toast('save')
    }
  },
  components: {
    'van-address-edit': AddressEdit
  }
}
</script>

<style lang="scss" scoped>
    .add-addr-container {
        margin-bottom: 50px;
    }
</style>
