import request from '@/utils/request'

export function getproductLists(data) {
  return request({
    url: 'admin/product/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/product/info',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/product/info/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/product/info/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/product/' + id,
    method: 'delete'
  })
}

export function getproductspecLists(data) {
  return request({
    url: 'admin/product_spec/list',
    method: 'post',
    data
  })
}
export function examinePut(urlId, data) {
  return request({
    url: 'admin/product/' + urlId + '/status',
    method: 'put',
    data
  })
}
export function ProductTypeList(data) {
  return request({
    url: 'admin/common/product/enum/ProductTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function ProductstatusList(data) {
  return request({
    url: 'admin/common/product/enum/ProductStatusEnum',
    method: 'get',
    pamers: data
  })
}
export function RefundTypeList(data) {
  return request({
    url: 'admin/common/product/enum/RefundTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function TransportTypeList(data) {
  return request({
    url: 'admin/common/product/enum/TransportTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function getimgList(id) {
  return request({
    url: 'admin/product_img/product/' + id,
    method: 'get'
  })
}
export function editimgList(id, data) {
  return request({
    url: 'admin/product_img/batch/' + id,
    method: 'put',
    data
  })
}

export function getmultiSpec(id) {
  return request({
    url: 'admin/product_spec/product_id/' + id,
    method: 'get'
  })
}

export function editcomment(id, status) {
  return request({
    url: 'admin/product_comment/' + id + '/status/' + status,
    method: 'put'
  })
}

// 规格标题查询
export function getproductattributeList(data) {
  return request({
    url: 'admin/product_attribute/list',
    method: 'post',
    data
  })
}
// 规格标题添加
export function postproductattributeList(productId, data) {
  return request({
    url: 'admin/product_attribute/batch/' + productId,
    method: 'post',
    data
  })
}
// 规格标题修改
export function putproductattributeList(data) {
  return request({
    url: 'admin/product_attribute/batch',
    method: 'put',
    data
  })
}
export default { add, edit, del }
