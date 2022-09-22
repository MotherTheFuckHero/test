import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
  // return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3bGciLCJleHAiOjE2MzE5NDg5NDMsInVzZXIiOiJ0dEJ3bkZYQXdXYkh2Snpscjg4c2VfYURGM3lvc1o3VWNmQVhmRFB0QkZfdDI0eXJqOGFqQmxsMExwT2djeVpCN2FkZzNXNHdxXy1XX2VxQ0ZTRjUwcU1reVFUM056UGNJUm9WRDJjSHJiMD0ifQ.pR2XJpGsgdGTmRHAhGlq3FOoN7vm1ZLzCnZLlhPi3QI'
}
export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}
