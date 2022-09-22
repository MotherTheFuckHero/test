import request from '@/utils/request'

export function getproductLists(data) {
  return request({
    url: 'admin/product_desc/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/product_desc',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/product_desc/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/product_desc/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/product_desc/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
