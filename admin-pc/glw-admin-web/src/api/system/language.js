import request from '@/utils/request'

export function getlanguageLists(data) {
  return request({
    url: 'admin/language/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/language',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/language/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/language/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/language/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
