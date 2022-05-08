import { reqGetAddress, reqOrderInfo } from '@/api'
const state = {
  address: [],
  orderList: {}
}
const actions = {
  //获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqGetAddress()
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  //获取商品清单
  async getOrderList({ commit }) {
    let result = await reqOrderInfo()
    if (result.code == 200) {
      commit('GETORDERLIST', result.data)
    }
  }
}
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETORDERLIST(state, orderList) {
    state.orderList = orderList
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
