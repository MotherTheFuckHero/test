import request from '@/utils/request'

export function getproductSpecLists(data) {
  return request({
    url: 'admin/product_spec/list',
    method: 'post',
    data
  })
}

export function getProductIdLists(pageNo, pageSize, data) {
  return request({
    url: `admin/stock_product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

// 订单类型
export function statusListss(data) {
  return request({
    url: 'admin/common/product/enum/StockTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function add(data) {
  return request({
    url: 'admin/product_spec',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/product_spec/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/product_spec/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/product_spec/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
