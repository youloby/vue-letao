<template>
    <div class="login-container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                登陆
                </van-button>
            </div>
        </van-form>
        <div class="register">
            <span @click="register">新用户注册</span>
        </div>
    </div>
</template>

<script>
import { Form, Field, Button } from 'vant'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
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
