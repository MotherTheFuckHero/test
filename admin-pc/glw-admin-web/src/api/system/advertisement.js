import request from '@/utils/request'

export function getadvertisementLists(data) {
  return request({
    url: 'admin/sys_advertisement/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_advertisement',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_advertisement/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/sys_advertisement/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_advertisement/' + id,
    method: 'delete'
  })
}

export function positionLists(data) {
  return request({
    url: 'admin/common/dict_data/advertisement_position',
    method: 'get',
    pamers: data
  })
}

export default { add, edit, del }
