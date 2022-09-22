import request from '@/utils/request'

export function getproductSpecLists(data) {
  return request({
    url: 'admin/product_spec/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/product_spec',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/product_spec/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/product_spec/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/product_spec/' + id,
    method: 'delete'
  })
}
export function productSpecBatch(id, languageId, data) {
  return request({
    url: 'admin/product_spec/batch/' + id + '/' + languageId,
    method: 'put',
    data
  })
}
export default { add, edit, del }
