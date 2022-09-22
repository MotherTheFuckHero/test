import request from '@/utils/request'

export function divideGet() {
  return request({
    url: 'admin/category_desc/parent/' + 0,
    method: 'get'
  })
}
export function divideGetid(id) {
  return request({
    url: 'admin/category_desc/parent/' + id,
    method: 'get'
  })
}
export function add(data) {
  return request({
    url: 'admin/category_desc',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/category_desc/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/category_desc/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/category_desc/' + id,
    method: 'delete'
  })
}
export function editcategory(id, status) {
  return request({
    url: 'admin/category_desc/' + id + '/status/' + status,
    method: 'put'
  })
}
export default { add, edit, del }
