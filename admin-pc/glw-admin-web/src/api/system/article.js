import request from '@/utils/request'

export function getarticleLists(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_article/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_article',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_article/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_article/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_article/' + id,
    method: 'delete'
  })
}
export function editarticle(id, status) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_article/' + id + '/' + status,
    method: 'put'
  })
}
export default { add, edit, del }
