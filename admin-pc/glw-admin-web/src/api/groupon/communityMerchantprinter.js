import request from '@/utils/request'

export function getcommunitymerchantprinterLists(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_merchant_printer/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_merchant_printer',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_merchant_printer/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_merchant_printer/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_merchant_printer/' + id,
    method: 'delete'
  })
}
export function getMerchantPrinterType(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/api/common/community/enum/CommunityMerchantPrinterTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function getMerchantPrinterOrderStatus(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/api/common/community/enum/CommunityMerchantPrinterOrderStatusEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
