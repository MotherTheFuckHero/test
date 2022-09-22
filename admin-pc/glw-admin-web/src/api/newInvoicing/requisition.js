import request from '@/utils/request'

export function postAllotOrder(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/allot_order',
    method: 'post',
    data
  })
}

export function getAllAllotOrder(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/allot_order/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function allotOrderWarehousing(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/allot_order/storage/' + id,
    method: 'put',
    data
  })
}

export function delAllotOrder(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/allot_order/' + id,
    method: 'delete'
  })
}

export function getAllotOrderDetail(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/allot_order/' + id,
    method: 'get'
  })
}

export function updateAllotOrder(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/allot_order/' + id,
    method: 'put',
    data
  })
}
