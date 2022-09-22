import request from '@/utils/request'

export function getdictdataLists(data) {
  return request({
    url: 'admin/dict_data/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/dict_data',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/dict_data/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/dict_data/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/dict_data/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
