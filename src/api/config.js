import axios from 'axios';
import router from '@/router/index.js';
import { Toast } from 'vant';
import store from '@/store/store.js';
// import { setTimeout } from 'core-js';
import { sleep } from '@/util/tool.js';

let apiUrl = process.env.NODE_ENV === 'development' ?'http://127.0.0.1:3000/api' :'http://api.w0824.com/api';
const instance = axios.create({
  baseURL: apiUrl
})

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
  // 在发送请求之前做些什么

    // 设置自定义请求头(authorized-要求是https)携带token到后台，方便后台进行验证
    var token = localStorage.getItem('token') || '';
    token && (config.headers.token = token)
    // If-Modified-Since 是标准的HTTP请求头标签，在发送HTTP请求时，
    // 把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较
    config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据

    store.commit('changePending', true);
    await sleep(500);
    return config

}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  store.commit('changePending', false);
  return response.data
}, function (error) {
  // 对响应错误做点什么
    let status = error.response.status;
    let message = error.response.data.message;
    switch(status){
        case 401:
            Toast(message);
            router.push('/login');
            break;
        default:
            Toast('网络错误，请稍后再试');
    }
    // return Promise.reject(error)
})

export default instance
