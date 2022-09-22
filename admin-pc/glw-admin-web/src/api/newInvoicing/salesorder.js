import request from '@/utils/request'

export function postSales(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/sale_order',
    method: 'post',
    data
  })
}

export function getAllSalesOrder(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/sale_order/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function delSalesOrder(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/sale_order/' + id,
    method: 'delete'
  })
}

export function salesOrderSale(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/sale_order/sale/' + id,
    method: 'put',
    data
  })
}

export function paySaleOrder(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/sale_order/pay/' + id,
    method: 'put'
  })
}

export function getSaleOrderDetail(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/sale_order/' + id,
    method: 'get'
  })
}

export function updateSaleOrder(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/sale_order/' + id,
    method: 'put',
    data
  })
}
