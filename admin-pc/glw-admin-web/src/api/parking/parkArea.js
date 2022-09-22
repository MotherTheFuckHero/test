import request from '@/utils/request'

export function getparkAreaLists(data) {
  return request({
    url: 'admin/park_area/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/park_area',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/park_area/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/park_area/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/park_area/' + id,
    method: 'delete'
  })
}
export function ParkAreaStatusLists(data) {
  return request({
    url: 'admin/common/product/enum/ParkAreaStatusEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
