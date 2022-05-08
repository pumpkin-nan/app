import { reqGoodInfo, reqAddToCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  uuid_token: getUUID()
}
const actions = {
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddToCart(skuId, skuNum)
    if (result.code == 200) {
      return 'OK'
    } else {
      // 加入购物车失败
      return Promise.reject(new Error('Fail'))
    }
  }
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const getters = {
  categoryView(state) {
    //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
