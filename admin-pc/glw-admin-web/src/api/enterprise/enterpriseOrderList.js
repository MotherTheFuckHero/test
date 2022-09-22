import request from '@/utils/request'

export function editEntepriseOrder(status, id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + `admin/enteprise_order/status/${status}/${id}`,
    method: 'put'
  })
}

/* 打印*/
export function orderEnterprisePrint(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enteprise_order/print/' + id,
    method: 'get'
  })
}

export function settlementStatusList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/EnterpriseOrderStatusEnum',
    method: 'get',
    pamers: data
  })
}
