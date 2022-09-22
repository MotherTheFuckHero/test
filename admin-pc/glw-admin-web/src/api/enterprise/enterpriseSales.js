import request from '@/utils/request'

export function getmerchantsalesLists(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales/' + id,
    method: 'delete'
  })
}

export function TypeEnumList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/MerchantSalesTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function editstatus(id, status) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales/' + id+'/status/'+ status,
    method: 'put',
  })
}
export default { add, edit, del }
