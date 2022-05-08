//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

//使用插件
Vue.use(VueRouter)

import routes from './routes'

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
//第一个参数：告诉原来的push方法，你往哪跳转（传递那些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call||apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

//配置路由
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})
// 全局守卫：前置守卫(在路由跳转之间进行判断)
//to：可以获取你要跳转到那个路由信息
//from：可以获取到你那个路由来的信息
//next：放行函数 next()放行 next(path)放行到指令路由 next(false)
router.beforeEach(async (to, from, next) => {
  next()
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    //用户已经登录了，不能去login
    if (to.path == '/login') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        //没有用户信息，派发action让仓库存储用户信息在跳转
        try {
          //获取用户信息在首页展示
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token失效了获取不到用户信息，重新登陆
          store.dispatch('userLoginOut')
          next('/login')
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path
    if (
      toPath.indexOf('/center') != '-1' ||
      toPath.indexOf('/trade') != '-1' ||
      toPath.indexOf('/pay') != '-1'
    ) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + toPath)
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next()
    }
  }
})
export default router
//获取用户信息在首页展示
// this.$store.dispatch('getUserInfo')
