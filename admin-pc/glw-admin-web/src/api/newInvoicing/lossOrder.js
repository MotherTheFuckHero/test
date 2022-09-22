import request from '@/utils/request'

export function postIndecOrder(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/indec_order',
    method: 'post',
    data
  })
}

export function getAllLossOrder(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/indec_order/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function lossOrderWarehousing(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/indec_order/storage/' + id,
    method: 'put',
    data
  })
}

export function delLossOrder(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/indec_order/' + id,
    method: 'delete'
  })
}

export function getLossOrderDetail(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/indec_order/' + id,
    method: 'get'
  })
}

export function updateLossOrder(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/indec_order/' + id,
    method: 'put',
    data
  })
}
