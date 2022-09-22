import request from '@/utils/request'

export function getmerchantcommunityLists(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/merchant_community/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/merchant_community',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: process.env.VUE_APP_community_API + 'admin/merchant_community',
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/merchant_community/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/merchant_community/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
