import request from '@/utils/request'

export function getparkinfoLists(data) {
  return request({
    url: 'admin/park_info/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/park_info',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/park_info/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/park_info/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/park_info/' + id,
    method: 'delete'
  })
}
export function ParkInfoStatusLists(data) {
  return request({
    url: 'admin/common/product/enum/ParkInfoStatusEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
