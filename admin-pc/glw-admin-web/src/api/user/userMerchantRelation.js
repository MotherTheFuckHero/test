import request from '@/utils/request'

export function getusermerchantrelationLists(data) {
  return request({
    url: 'admin/user_merchant_relation/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/user_merchant_relation',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/user_merchant_relation/' + id,
    method: 'put',
    data
  })
}
export function del(id) {
  return request({
    url: 'admin/user_merchant_relation/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
