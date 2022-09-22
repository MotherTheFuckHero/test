import request from '@/request/http'
import Config from '@/settings'

export function login(username, password, code, uuid) {
  return request({
    url: process.env.BASE_SSO_URL +'/auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: process.env.BASE_SSO_URL +'/api/user_info',
    method: 'get'
  })
}
export function logout() {
  const params = {
    systemId: Config.systemId
  }
  return request({
    url: process.env.BASE_SSO_URL +'/api/logout',
    method: 'delete',
    params
  })
}
