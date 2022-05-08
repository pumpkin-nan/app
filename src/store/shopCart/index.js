import { reqCartList, reqDeleteCartById, reqUpdateChecked } from '@/api'
const state = {
  cartList: []
}
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },

  //删除购物车的某一个产品
  async deleteCartList({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  //修改购物车某一个产品选中的状态
  async updateChecked({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked)
    if (result.code == 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  //删除购物车中选中的所有商品
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  //修改全部商品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('updateChecked', {
        skuId: item.skuId,
        isChecked
      })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
