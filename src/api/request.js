//对axios进行二次封装
import axios from 'axios'
import { Promise } from 'core-js'
//引入进度条
import nprogress from 'nprogress'
//start：进度条开始 done：进度条结束
import 'nprogress/nprogress.css'

import store from '@/store'

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径中会出现API
  baseURL: '/api',
  // 代表请求超过的事件5s
  timeOut: 5000
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以再请求出去之前做一些事情
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    // 请求添加一个字段（userTempId）
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }

  // config:配置对象，对象里面有一个属性很重要，header请求头
  //进度条开始动
  nprogress.start()
  return config
})

// 相应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数：服务器相应数据回来后，响应拦截器可以检测到，可以做一些事情
    return res.data
  },
  (error) => {
    //响应后失败的回调函数
    //进度条结束
    nprogress.done()
    return Promise.reject(new Error('fail'))
  }
)

export default requests
