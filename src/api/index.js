//当前这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockRequest'
//三级联动接口
///api/product/getBaseCategoryList get 无参数
// 发请求：axios发请求返回结果Promise对象

export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//获取banner（Home首页轮播图接口）
export const reqBannerList = () => {
  return mockRequests({ url: '/banner', method: 'get' })
}

//获取floor数据
export const reqFloorList = () => {
  return mockRequests({ url: '/floor', method: 'get' })
}

//获取搜索模块数据 地址：/api/list 请求方式：post 带参数
//当前这个接口，给服务器传参params，至少是一个空对象
export const reqSearchInfo = (params) => {
  return requests({ url: '/list', method: 'post', data: params })
}

//获取商品详情数据 地址：/api/item/{ skuId } 请求方式：get 带参数
export const reqGoodInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: 'get' })
}

//将商品添加到购物车中（获取更新某一个产品个数）
//地址：/api/cart/addToCart/{ skuId }/{ skuNum } 请求方式：post
export const reqAddToCart = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

// 获取购物车列表 地址：/api/cart/cartList 请求方式：GET
export const reqCartList = () => {
  return requests({ url: '/cart/cartList', method: 'get' })
}

//删除购物车 地址：/api/cart/deleteCart/{skuId} 请求方式： DELETE
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}

//切换商品选中状态 地址： /api/cart/checkCart/{skuId}/{isChecked} 请求方式： GET
export const reqUpdateChecked = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked} `,
    method: 'get'
  })
}
//获取验证码 地址：/api/user/passport/sendCode/{phone} 请求方式： GET
export const reqPhoneCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}

//注册用户 地址：/api/user/passport/register 请求方式 ：POST
export const reqRegister = (data) => {
  return requests({ url: `/user/passport/register`, data, method: 'post' })
}

//登录用户 地址：/api/user/passport/login 请求方式 ：POST phone/password
export const reqUserLogin = (data) => {
  return requests({ url: `/user/passport/login/`, data, method: 'post' })
}

// 获取用户信息/api/user/passport/auth/getUserInfo 请求方式： GET
export const reqUserInfo = () => {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}

//退出登录 地址：/api/user/passport/logout 请求方式：get
export const reqLoginOut = () => {
  return requests({ url: '/user/passport/logout', method: 'get' })
}

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList 请求方式：get
export const reqGetAddress = () => {
  return requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
  })
}

//获取订单交易页信息 /api/order/auth/trade 请求方式：get
export const reqOrderInfo = () => {
  return requests({ url: '/order/auth/trade', method: 'get' })
}
//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式 ：POST
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
  })
}

// 获取订单的支付信息 /api/payment/weixin/createNative/{orderId} 请求方式：get
export const reqOrderPay = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId} `,
    method: 'get'
  })
}

//查询订单状态 /api/payment/weixin/queryPayStatus/{orderId} 请求方式：get
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId} `,
    method: 'get'
  })
}

//获取我的订单列表 /api/order/auth/{page}/{limit}请求方式：get
export const reqMyOrderList = (page, limit) => {
  return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}
