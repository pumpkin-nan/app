//search模块的小仓库
import Vue from 'vue'
import Vuex from 'vuex'
import { reqSearchInfo } from '@/api'

//使用插件一次
Vue.use(Vuex)

// //state：仓库存储数据的地方
const state = {
  searchList: {}
}
// // mutations:修改state的唯一手段
const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
// // action:处理action的地方，可以书写自己数据逻辑，也可以处理异步
const actions = {
  async searchList({ commit }, params = {}) {
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqSearchInfo(params)
    if (result.code == 200) {
      commit('SEARCHLIST', result.data)
    }
  }
}
//计算属性:项目当中getters主要的作用是：简化仓库中的数据
const getters = {
  goodsList(state) {
    //如果网络不给力|没有网 state.searchList.goodsList 返回undefined
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
