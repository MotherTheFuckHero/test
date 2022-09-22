import request from '@/utils/request'

export function getDicts(data) {
  return request({
    url: 'admin/dict_type/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/dict_type',
    method: 'post',
    data
  })
}
export function del(id) {
  return request({
    url: 'admin/dict_type/' + id,
    method: 'delete'
  })
}
export function edit(id, data) {
  return request({
    url: 'admin/dict_type/' + id,
    method: 'put',
    data
  })
}

export default { add, edit, del }
