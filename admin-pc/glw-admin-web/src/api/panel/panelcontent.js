import request from '@/utils/request'

export function getpanelcontentLists(data) {
  return request({
    url: 'admin/panel_content/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/panel_content',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/panel_content/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/panel_content/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/panel_content/' + id,
    method: 'delete'
  })
}
export function panelpositionList(data) {
  return request({
    url: 'admin/common/sys/enum/ContentPositionEnum',
    method: 'get',
    pamers: data
  })
}
export function paneltypeList(data) {
  return request({
    url: 'admin/common/sys/enum/ContentTypeEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
