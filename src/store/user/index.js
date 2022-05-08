import {
  reqPhoneCode,
  reqRegister,
  reqUserLogin,
  reqUserInfo,
  reqLoginOut,
  reqGetAddress
} from '@/api'
import { setToken, getToken, clearToken } from '@/utils/token'
//登录与注册模块
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqPhoneCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async userRegister({ commit }, user) {
    let result = await reqRegister(user)
    if (result.code == 200) {
      return '注册成功！'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      //持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  //退出登录
  async userLoginOut({ commit }) {
    let result = await reqLoginOut()
    if (result.code == 200) {
      commit('USERLOGINOUT')
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  USERLOGINOUT(state) {
    state.token = ''
    state.userInfo = {}
    clearToken()
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
