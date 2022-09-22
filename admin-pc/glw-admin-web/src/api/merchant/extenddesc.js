import request from '@/utils/request'
export function add(data) {
  return request({
    url: 'admin/merchant_extend',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/merchant_extend/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/merchant_extend/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/merchant_extend/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
