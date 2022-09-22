import axios from 'axios'
import { Notification } from 'element-ui'
import store from '../store'
import Config from '@/settings'
import { redirectToSsoPage } from '@/utils/sso'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['x-glw-token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else {
      // return response.data
      if (response.data.code === '0') {
        return response.data
      } else {
        Notification.error({
          title: response.data.msg
        })
        return Promise.reject('error')
      }
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 5000
        })
        return Promise.reject(error)
      }
    }
    console.log(code)
    if (code) {
      if (code === 401) {
        // 重新登录
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        redirectToSsoPage()
      } else if (code === 403) {
        // router.push({ path: '/401' })
        Notification.error({
          title: '没有权限，请先申请权限',
          duration: 5000
        })
      } else if (code === 406) {
        Notification.error({
          title: '未创建或者未关联商家不允许操作',
          duration: 5000
        })
      } else {
        const errorMsg = error.response.data.msg || error.response.data.message
        if (errorMsg !== undefined) {
          Notification.error({
            title: errorMsg,
            duration: 5000
          })
        }
      }
    } else {
      Notification.error({
        title: '接口请求失败',
        duration: 5000
      })
    }
    return Promise.reject(error)
  }
)
export default service
