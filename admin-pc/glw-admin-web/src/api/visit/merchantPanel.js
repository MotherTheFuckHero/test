import request from '@/utils/request'

export function getpanelLists(data) {
  return request({
    url:  process.env.VUE_APP_visit_API + 'admin/merchant_panel/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_visit_API +'admin/merchant_panel',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_visit_API +'admin/merchant_panel/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_visit_API +'admin/merchant_panel/' + id,
    method: 'get'
  })
}
export function del(id) {
  return request({
    url: process.env.VUE_APP_visit_API +'admin/merchant_panel/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
