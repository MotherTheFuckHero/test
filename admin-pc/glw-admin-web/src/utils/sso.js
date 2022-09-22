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
  // let redirectUri
  // if (store.getters.routeMode === 'hash') {
  //   redirectUri = encodeURIComponent(location.origin + '/#' + (to ? to.fullPath : '/'))
  // } else if (store.getters.routeMode === 'history') {
  var redirectUri = encodeURIComponent(location.origin + (to ? to.fullPath : '/'))
  // }
  window.location.href = process.env.VUE_APP_SSO_API + '/login?' + [
    'redirectUrl=' + redirectUri,
    'state=' + randomString(8),
    'clientId=' + Config.clientId,
    'systemId=' + Config.systemId,
    'userType=' + Config.userType,
    'loginType=' + Config.loginType
  ].join('&')
}

export default { randomString, redirectToSsoPage }
