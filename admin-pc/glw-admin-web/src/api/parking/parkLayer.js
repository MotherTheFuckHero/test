import request from '@/utils/request'

export function getparkLayerLists(data) {
  return request({
    url: 'admin/park_layer/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/park_layer',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/park_layer/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/park_layer/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/park_layer/' + id,
    method: 'delete'
  })
}

export function ParkLayerStatusLists(data) {
  return request({
    url: 'admin/common/product/enum/ParkLayerStatusEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
