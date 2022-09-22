// import store from '../store'
import Config from '@/settings'

export const randomString = len => {
  let rt = ''
  var arr = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]

  for (let i = 0; i < len; i++) {
    var pos = Math.floor(Math.random() * arr.length)
    rt += arr[pos]
  }
  return rt
}

// === 跳转sso方法 redirectToSsoPage ===
export const redirectToSsoPage = (to = null) => {
  var redirectUri = encodeURIComponent(location.origin + (to ? to.fullPath : '/'))
  window.location.href = process.env.BASE_SSO_URL + '/login?' + [
    'redirectUrl=' + redirectUri,
    'state=' + randomString(8),
    'clientId=' + Config.clientId,
    'systemId=' + Config.systemId,
    'userType=' + Config.userType,
    'loginType=' + Config.loginType
  ].join('&')
}
// === 跳转sso方法 registerSsoPage ===
export const registerSsoPage = (to = null) => {
  var redirectUri = encodeURIComponent(location.origin + (to ? to.fullPath : '/'))
  window.location.href = process.env.BASE_SSO_URL + '/register?' + [
    'redirectUrl=' + redirectUri,
    'state=' + randomString(8),
    'clientId=' + Config.clientId,
    'systemId=' + Config.systemId,
    'userType=' + Config.userType,
    'loginType=' + Config.loginType
  ].join('&')
}
export default { randomString, redirectToSsoPage,registerSsoPage }
