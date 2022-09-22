import request from '@/utils/request'

export function getuserCarLists(data) {
  return request({
    url: 'admin/user_car/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/user_car',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/user_car/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/user_car/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/user_car/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
