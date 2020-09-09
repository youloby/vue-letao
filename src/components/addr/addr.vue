<template>
    <div class="addr-container">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script>
import { AddressList } from 'vant';
import { getaddress } from '@/api/index.js';

export default {
  created () {
    this.$parent.title = '地址管理';
    this.getaddrlist();
  },
  components: {
    'van-address-list': AddressList
  },
  data () {
    return {
      chosenAddressId: '1',
      list: []
    }
  },
  methods: {
    onAdd () {
      this.$router.push('/addAddr')
    },
    onEdit (item) {
      this.$router.push(`/editAddr/${JSON.stringify(item)}`);
    },
    async getaddrlist(){
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
  }
}
</script>

<style lang="scss" scoped>
    .addr-container {
        margin-bottom: 50px;
    }
</style>
