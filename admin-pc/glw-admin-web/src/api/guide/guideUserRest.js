import request from '@/utils/request'

export function getguideUserLists(data) {
  return request({
    url: 'admin/user_rest/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/user_rest',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/user_rest/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/user_rest/' + id,
    method: 'get'
  })
}
export function del(id) {
  return request({
    url: 'admin/user_rest/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }

