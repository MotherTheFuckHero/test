import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  // return Cookies.get(TokenKey)
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3bGciLCJleHAiOjE2NjQxODE4MzIsInVzZXIiOiIwa1JteFdQVHYweEhoWDM5YUdsZWhwQm1OVjNRTURKVXpMQV9Ld0hrc05lU2w5a3VjeHhtM01BTVgwLUhsUE96TnFJa0ZPcktrQUtPZ204NTI4azl2ZTZlUm94TndQNEtCNnhWOGRuZTVlX3FENWVJbF9VNy1KQlV3d3VxYWVSMCJ9.ceIATNwKhg6roIbfTOyLd4XnMhOpKaHOxZMiRBKPC8s'
}
export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
