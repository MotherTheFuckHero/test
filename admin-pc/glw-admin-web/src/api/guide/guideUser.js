import request from '@/utils/request'

export function getguideUserLists(data) {
  return request({
    url: 'admin/guide_user/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/guide_user',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/guide_user/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/guide_category/' + id,
    method: 'get'
  })
}
export function del(id) {
  return request({
    url: 'admin/guide_user/' + id,
    method: 'delete'
  })
}

export function guideUserStatus(data) {
  return request({
    url: 'admin/common/user/enum/UserGuideStatusEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }

