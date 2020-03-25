import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import { Message } from 'element-ui'
let instance = axios.create({
  headers: {
    // 'content-type': 'application/x-www-form-urlencoded'
    'content-type': 'application/json'
  }
})
// http request 拦截器
instance.interceptors.request.use(
  (config) => {
    if (store.state.login.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // config.headers.authorization = store.state.token // 请求头加上token
      config.headers.token = store.state.login.token // 请求头加上token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// http response 拦截器
instance.interceptors.response.use(
  (response) => {
    // 拦截响应，做统一处理
    if (response.data.code) {
      switch (response.data.code) {
        case 401:
          store.commit('login/TOKENOPTIONS', { token: null, sideBar: [] })
          Message.error('登录超时，请重新登录！')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          Message.error('您没有权限！')
          router.go(-1)
          break
      }
    }
    return response
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (error) => {
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)
export default instance
