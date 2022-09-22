import request from '@/utils/request'

export function getvoteitemLists(data) {
  return request({
    url: 'admin/vote_item/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/vote_item',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/vote_item/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/vote_item/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/vote_item/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }

