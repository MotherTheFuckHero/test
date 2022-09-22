import request from '@/utils/request-sso'
import Config from '@/settings'

export function login(username, password, code, uuid) {
  return request({
    url: 'auth/login',
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
    url: 'api/user_info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

export function logout() {
  const params = {
    systemId: Config.systemId
  }
  return request({
    url: 'api/logout',
    method: 'delete',
    params
  })
}
