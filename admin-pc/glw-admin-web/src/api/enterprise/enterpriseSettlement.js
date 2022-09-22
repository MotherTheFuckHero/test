import request from '@/utils/request'

export function settlementdetailList(data, params) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/settlement_detail/page_list',
    method: 'post',
    data,
    params
  })
}

export function settlementPut(id, status) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/settlement_info/' + id + '/status/' + status,
    method: 'put'
  })
}

export function settlementInvoice(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/settlement_info/invoice',
    method: 'put',
    data
  })
}

export function settlementStatusList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/SettlementStatusEnum',
    method: 'get',
    pamers: data
  })
}
