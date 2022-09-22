import request from '@/utils/request'

export function getUserList(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales/list',
    method: 'post',
    data
  })
}

export function getAllProduct(data, pageNo, pageSize) {
  return request({
    url: `admin/product/product_select?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getShop(data) {
  return request({
    url: 'admin/supplier_info/list',
    method: 'post',
    data
  })
}

export function getProductList(data, pageNo, pageSize) {
  return request({
    url: `admin/product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getShopDetil(data) {
  return request({
    url: 'admin/product_spec_stock/spec_list',
    method: 'post',
    data
  })
}

export function submitShop(data) {
  return request({
    url: '/admin/stock_info',
    method: 'post',
    data
  })
}
// export function getUserList(merchantId) {
//   return request({
//     url: 'admin/stock_info/user_list/' + merchantId,
//     method: 'get'
//   })
// }

export function enterhouse(id, data) {
  return request({
    url: 'admin/stock_info/storage/' + id,
    method: 'put',
    data
  })
}
