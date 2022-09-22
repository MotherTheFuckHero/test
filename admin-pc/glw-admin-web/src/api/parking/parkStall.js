import request from '@/utils/request'

export function getparkStallLists(data) {
  return request({
    url: 'admin/park_stall/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/park_stall',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/park_stall/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/park_stall/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/park_stall/' + id,
    method: 'delete'
  })
}
export function ParkStallStatusLists(data) {
  return request({
    url: 'admin/common/product/enum/ParkStallStatusEnum',
    method: 'get',
    pamers: data
  })
}
export function CarModelLists(data) {
  return request({
    url: 'admin/common/product/enum/CarModelEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
