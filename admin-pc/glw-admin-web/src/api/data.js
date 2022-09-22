import request from '@/utils/request'
import qs from 'qs'

export function initData(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export function initDataPost(url, pageParams, data) {
  return request({
    url: url + '?' + qs.stringify(pageParams, { indices: false }),
    method: 'post',
    data
  })
}

export function download(url, data) {
  return request({
    url: url,
    method: 'post',
    responseType: 'blob',
    data
  })
}
