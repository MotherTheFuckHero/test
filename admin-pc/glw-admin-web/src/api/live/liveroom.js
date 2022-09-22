import request from '@/utils/request'

export function getliveroomLists(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
