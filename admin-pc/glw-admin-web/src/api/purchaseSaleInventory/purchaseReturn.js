import request from '@/utils/request'

export function getSupplier(data) {
  return request({
    url: 'admin/supplier_info/list',
    method: 'post',
    data
  })
}

export function getProductList(data) {
  return request({
    url: 'admin/product/product_list',
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

export function getUserList(merchantId) {
  return request({
    url: 'admin/stock_info/user_list/' + merchantId,
    method: 'get'
  })
}

