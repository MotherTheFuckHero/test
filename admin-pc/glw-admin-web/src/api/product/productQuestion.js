import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/product_question',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/product_question/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/product_question/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/product_question/' + id,
    method: 'delete'
  })
}
export function editproductQuestion(id, status) {
  return request({
    url: 'admin/product_question/' + id + '/status/' + status,
    method: 'put'
  })
}
export default { add, edit, del }
