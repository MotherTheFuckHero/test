import request from '@/utils/request'

export function getpanelcategoryLists(data) {
  return request({
    url: 'admin/panel_category/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/panel_category',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/panel_category/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/panel_category/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/panel_category/' + id,
    method: 'delete'
  })
}

export function editpanelcategorystatus(id, status) {
  return request({
    url: 'admin/panel_category/' + id + '/status/' + status,
    method: 'put'
  })
}
export default { add, edit, del }
