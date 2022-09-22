import request from '@/utils/request'

export function getsystemLists(data) {
  return request({
    url: 'admin/sys_system/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_system',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_system/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/sys_system/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_system/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
