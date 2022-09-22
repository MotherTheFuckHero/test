import request from '@/utils/request'

export function getcommunityLists(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community/' + id,
    method: 'put',
    data
  })
}
export function editheadAddress(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head_address/' + id,
    method: 'put',
    data
  })
}
export function delheadAddress(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head_address/' + id,
    method: 'delete'
  })
}
export function get(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community/' + id,
    method: 'delete'
  })
}
export function getCommunityType(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/api/common/community/enum/CommunityTypeEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
