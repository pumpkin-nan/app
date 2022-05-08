import Vue from 'vue'
import Vuex from 'vuex'
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'

Vue.use(Vuex)
// //state：仓库存储数据的地方
const state = {}
// // mutations:修改state的唯一手段
const mutations = {}
// // action:处理action的地方，可以书写自己数据逻辑，也可以处理异步
const action = {}
// // getters: 理解为计算属性，用于简化仓库的数据，让组件获取仓库中的数据更加方便
const getter = {}
//对外暴露store类的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块化开发存储数据
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})
