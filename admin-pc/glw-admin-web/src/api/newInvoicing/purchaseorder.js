import request from '@/utils/request'

export function getAllProduct(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `api/product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getAllInStockProduct(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/warehouse_product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function postPurchase(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/purchase_order',
    method: 'post',
    data
  })
}

export function getAllPurchaseOrder(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/purchase_order/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getPurchaseOrderDetail(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/purchase_order/' + id,
    method: 'get'
  })
}

export function purchaseOrderWarehousing(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/purchase_order/storage/' + id,
    method: 'put',
    data
  })
}

export function updatePurchaseOrder(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/purchase_order/' + id,
    method: 'put',
    data
  })
}

export function payPurchaseOrder(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/purchase_order/pay/' + id,
    method: 'put'
  })
}

export function delPurchaseOrder(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/purchase_order/' + id,
    method: 'delete'
  })
}
