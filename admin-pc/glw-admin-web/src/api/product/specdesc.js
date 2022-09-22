import request from '@/utils/request'

export function add(data,productid) {
  return request({
    url: 'admin/product_spec/info/'+ productid,
    method: 'post',
    data
  })
}

export function edit(productid, data,languageId) {
  return request({
    url: 'admin/product_spec/batch/' + productid+'/'+languageId,
    method: 'put',
    data
  })
}

export function get(productid) {
  return request({
    url: 'admin/product_spec/product_id/' + productid,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/product_spec/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
