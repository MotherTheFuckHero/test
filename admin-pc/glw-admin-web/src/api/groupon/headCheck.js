import request from '@/utils/request'

export function getcommunityLists(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/head_check/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/head_check',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/head_check/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/head_check/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/head_check/' + id,
    method: 'delete'
  })
}
export function getType(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/api/common/community/enum/HeadCheckTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function getStatus(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/api/common/community/enum/HeadCheckStatusEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
