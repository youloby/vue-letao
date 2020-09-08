<template>
    <div class="user-container">
        <van-cell-group>
            <van-cell>
                <img src="@/assets/images/logo.png">
                <div class="name">用户名：{{ $store.state.userStore.user.username }}</div>
            </van-cell>
            <van-cell title="修改密码" is-link />
            <van-cell title="我的订单" is-link />
            <van-cell title="地址管理" is-link to="/addr" />
        </van-cell-group>
        <van-cell title="提交反馈" is-link />
        <van-cell title="关于乐淘" value="v1.0.0" />
        <van-cell value="weixin h5 pay" url="https://wxpay.wxutil.com/mch/pay/h5.v2.php" />
        <van-button type="default" block @click="logout">退出登录</van-button>
    </div>
</template>

<script>
import { Cell, CellGroup, Button, Dialog, Toast } from 'vant';

export default {
    components: {
        'van-cell': Cell,
        'van-cell-group': CellGroup,
        'van-button': Button
    },
    methods: {
        logout () {
            Dialog.confirm({
                message: '确认退出登录？',
                confirmButtonColor: '#1989fa'
            }).then(() => {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }).catch(() => {
                Toast('取消')
            })
        }
    },
    created () {
        this.$parent.title = '个人中心';
    }
}
</script>

<style lang="scss" scoped>
    .user-container {
        margin-bottom: 50px;
        .van-cell-group {
            margin-bottom: 18px;
            .van-cell {
                .van-cell__value {
                    display: flex;
                    align-items: center;
                    img {
                        width: 20%;
                        margin-right: 100px;
                    }
                    .name {
                        color: #5D5555;
                        font-size: 18px;
                    }
                }
            }
        }
        .van-button {
            position: fixed;
            bottom: 0;
        }
    }
</style>
