<template>
    <div class="login-container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                autocomplete="off"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
        <div class="register">
            <span @click="register">新用户注册</span>
        </div>
    </div>
</template>

<script>
import { Form, Field, Button } from 'vant';
import { login } from '@/api/index.js';

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
        let { status, token, userInfo } = await login(values.username, values.password);
        if(status === 0){
            localStorage.setItem('user', JSON.stringify(userInfo));
            localStorage.setItem('token', token);
            this.$store.commit('userStore/updateUser', userInfo);
            this.$router.push('/user');
        }else {
            this.$toast('登录失败，账号或密码错误');
        }
    },
    register () {
      this.$router.push('/register')
    }
  },
  created () {
    this.$parent.title = '乐淘登陆注册'
  },
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-button': Button
  }
}
</script>

<style lang="scss" scoped>
    .login-container {
        padding-top: 20px;
        .register {
            padding: 10px;
            color: #666;
            font-size: 16px;
            text-align: center;
        }
    }
</style>
