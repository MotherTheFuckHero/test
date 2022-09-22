import request from '@/utils/request'

export function getpostagetemplateLists(data) {
  return request({
    url: 'admin/postage_template/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/postage_template',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/postage_template/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/postage_template/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/postage_template/' + id,
    method: 'delete'
  })
}
export function postagetemplatetypeLists(data) {
  return request({
    url: 'admin/common/product/enum/PostageTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function postagetemplateModelLists(data) {
  return request({
    url: 'admin/common/product/enum/ValuationModelEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
