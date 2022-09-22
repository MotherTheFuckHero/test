import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/supplier_info',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/supplier_info/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/supplier_info/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/supplier_info/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
