<template>
    <div class="register-container">
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
            />
            <van-field
                v-model="confirm"
                type="password"
                name="confirm"
                label="确认密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写确认密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                注册
                </van-button>
            </div>
        </van-form>
        <div class="login">
            <span @click="login">登录</span>
        </div>
    </div>
</template>

<script>
import { Form, Field, Button } from 'vant';
import { register } from '@/api/index.js';

export default {
  data () {
    return {
      username: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    async onSubmit (values) {
        if(values.password !== values.confirm){
            this.$toast('输入的密码不相同');
            return;
        }
        let { status, message } = await register(values.username, values.password);
        this.$toast(message);
        if(status === 0){
            this.login();
        }
    },
    login () {
      this.$router.push('/login');
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
    .register-container {
        padding-top: 20px;
        .login {
            padding: 10px;
            color: #666;
            font-size: 16px;
            text-align: center;
        }
    }
</style>
