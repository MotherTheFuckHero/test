import request from '@/utils/request'

export function getpanelcontentLists(data) {
  return request({
    url: 'admin/panel_content_desc/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/panel_content_desc',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/panel_content_desc/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/panel_content_desc/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/panel_content_desc/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
