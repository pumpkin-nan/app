import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'
//home模块的小仓库
const state = {
  //state中数据的初始值不能瞎写【根据接口返回值初始化的】
  categoryList: [],
  bannerList: [],
  floorList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  //通知API里面的接口函数调用，向里面的服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获取首页轮播图的数据
  async bannerList({ commit }) {
    let result = await reqBannerList()
    if (result.code == 200) {
      commit('BANNERLIST', result.data)
    }
  },
  //获取floor数据
  async floorList({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) {
      commit('FLOORLIST', result.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
