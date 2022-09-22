/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import Config from '@/settings';
import {getToken,removeToken} from '../utils/auth'
import { redirectToSsoPage } from '@/utils/sso'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: Config.timeout // 请求超时时间
})


/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
service.interceptors.request.use(
  config => {
    let token =getToken()
    if (token) {
      config.headers['x-glw-token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    let lang = localStorage.getItem('lang')?localStorage.getItem('lang'):navigator.language;
    document.cookie = 'lang' + "=" +lang;
    config.headers['Content-Type'] = 'application/json';
    config.params = {'lang':lang}
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.msg
      })
      return Promise.reject('error')
    } else {
      return response.data
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
    if (code) {
      console.log(code)
      if (code === 401) {
        // Notification.error({
        //   title: '身份过期请重新登录',
        //   duration: 5000
        // })
        console.log('身份过期请重新登录')
        // 重新登录
        removeToken()
        redirectToSsoPage()
      } else if (code === 403) {
        // router.push({ path: '/401' })
        // Notification.error({
        //   title: '没有权限，请先申请权限',
        //   duration: 5000
        // })
        console.log('没有权限，请先申请权限')
      } else if (code === 406) {
        // Notification.error({
        //   title: '未创建或者未关联商家不允许操作',
        //   duration: 5000
        // })
        console.log('未创建或者未关联商家不允许操作')
      } else {
        const errorMsg = error.response.data.msg || error.response.data.message
        if (errorMsg !== undefined) {
          // Notification.error({
          //   title: errorMsg,
          //   duration: 5000
          // })
          console.log(errorMsg)
        }
      }
    } else {
      // Notification.error({
      //   title: '接口请求失败',
      //   duration: 5000
      // })
      console.log('接口请求失败')
    }
    return Promise.reject(error)
  }
)
export default service;
