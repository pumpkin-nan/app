import { v4 as uuidv4 } from 'uuid'
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久储存
export const getUUID = () => {
  //先从本地储存获取uuid（看一下本地存储里面是否含有）
  let uuid_token = localStorage.getItem('UUID')
  // 如果没有
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4()
    // 本地存储一份
    localStorage.setItem('UUID', uuid_token)
  }
  return uuid_token
}
