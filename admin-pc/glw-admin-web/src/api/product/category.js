import request from '@/utils/request'

export function divideGet() {
  return request({
    url: 'admin/category/parent/' + 0,
    method: 'get'
  })
}
export function divideGetid(id) {
  return request({
    url: 'admin/category/parent/' + id,
    method: 'get'
  })
}
export function add(data) {
  return request({
    url: 'admin/category',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/category/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/category/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/category/' + id,
    method: 'delete'
  })
}
export function editcategory(id, status) {
  return request({
    url: 'admin/category/' + id + '/status/' + status,
    method: 'put'
  })
}
export default { add, edit, del }
