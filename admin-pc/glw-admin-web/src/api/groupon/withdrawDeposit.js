import request from '@/utils/request'

export function getcommunityLists(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/withdraw_deposit/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/withdraw_deposit',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/withdraw_deposit/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/withdraw_deposit/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/withdraw_deposit/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
