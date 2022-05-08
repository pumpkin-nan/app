import Vue from 'vue'
import App from './App.vue'

import { Button, MessageBox } from 'element-ui'

//三级联动组件----全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//第一个参数：全局组件的名字 第二个组件：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.use(Button)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入MockServe.js----mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'

//引入所有API
import * as API from '@/api'
Vue.config.productionTip = false

import VueLazyload from 'vue-lazyload'
import picture from '@/assets/images/picture.gif'

Vue.use(VueLazyload, {
  loading: picture
})
//引入表单校验插件
import '@/validate'

new Vue({
  render: (h) => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由：下面的写法KV一致省略V【router小写的】
  router,
  //注册仓库：组件身上会多了一个属性$store属性
  store
}).$mount('#app')
