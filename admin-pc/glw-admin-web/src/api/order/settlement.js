import request from '@/utils/request'

export function exportDetails(data) {
  return request({
    url: process.env.VUE_APP_cashier_API + 'api/settlement_detail/export/' + data,
    method: 'get',
    responseType: 'blob'
  })
}
export function settlementdetailList(data, params) {
  return request({
    url: process.env.VUE_APP_cashier_API + 'api/settlement_detail/page_list',
    method: 'post',
    data,
    params
  })
}

export function settlementPut(id, data) {
  return request({
    url: process.env.VUE_APP_cashier_API + 'api/settlement_info/' + id + '/status',
    method: 'put',
    data
  })
}
export function closePut(id, data) {
  return request({
    url: process.env.VUE_APP_cashier_API + 'api/settlement_info/' + id + '/status/' + data,
    method: 'put'
  })
}
