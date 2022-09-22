import request from '@/utils/request'

export function getpanelLists(data) {
  return request({
    url: 'admin/panel/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/panel',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/panel/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/panel/' + id,
    method: 'get'
  })
}

export function getproductpanel(id) {
  return request({
    url: 'admin/panel_product_type/panel/' + id,
    method: 'get'
  })
}
export function productpaneledit(id, data) {
  return request({
    url: 'admin/panel_product_type/panel/' + id,
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'admin/panel/' + id,
    method: 'delete'
  })
}
export function paneltypeList(data) {
  return request({
    url: 'admin/common/sys/enum/PanelTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function panelstyleList(data) {
  return request({
    url: 'admin/common/dict_data/panel_style',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
