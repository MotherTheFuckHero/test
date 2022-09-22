import request from '@/utils/request'

export function getkeywordLists(data) {
  return request({
    url: 'admin/sys_keyword/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_keyword',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_keyword/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/sys_keyword/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_keyword/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
