import request from '@/utils/request'

export function getUserList(merchantId) {
  return request({
    url: 'admin/stock_info/user_list/' + merchantId,
    method: 'get'
  })
}

export function getWareHouseInfoLists(data) {
  return request({
    url: 'admin/warehouse_info/list',
    method: 'post',
    data
  })
}

export function getProductList(data) {
  return request({
    url: 'admin/product/product',
    method: 'post',
    data
  })
}

export function getInventoryList(pageNo, pageSize, data) {
  return request({
    url: `admin/product/product_page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getInventoryNoList(data) {
  return request({
    url: 'admin/product/product_list',
    method: 'post',
    data
  })
}

export function addInventoryNum(data) {
  return request({
    url: 'admin/stockcheck_info',
    method: 'post',
    data
  })
}

export function getInventoryDetail(pageNo, pageSize, data) {
  return request({
    url: `admin/stockcheck_info/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getInventoryDetailList(pageNo, pageSize, data) {
  return request({
    url: `admin/stockcheck_product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function edit(id, status) {
  return request({
    url: 'admin/stockcheck_info/' + id + '/' + status,
    method: 'put'
  })
}
export function del(id) {
  return request({
    url: 'admin/stockcheck_info/' + id,
    method: 'delete'
  })
}
export function exportList(data) {
  return request({
    url: 'admin/stockcheck_info/export',
    method: 'post',
    responseType: 'blob',
    data
  })
}
