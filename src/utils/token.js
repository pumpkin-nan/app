//存储token
export const setToken = (token) => {
  localStorage.setItem('Token', token)
}

//获取token
export const getToken = () => {
  return localStorage.getItem('Token')
}

// 清除本地储存token
export const clearToken = () => {
  localStorage.removeItem('Token')
}
