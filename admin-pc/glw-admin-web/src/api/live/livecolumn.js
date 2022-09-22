import request from '@/utils/request'

export function getlivecolumnLists(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_column/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_column',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_column/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_column/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_column/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
