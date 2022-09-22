import request from '@/utils/request'

export function getmerchantDeviceLists(data) {
  return request({
    url: 'admin/merchant_device/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/merchant_device',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/merchant_device/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/merchant_device/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/merchant_device/' + id,
    method: 'delete'
  })
}
// 类型
export function typeLists(data) {
  return request({
    url: 'admin/common/product/enum/DeviceTypeEnum',
    method: 'get',
    pamers: data
  })
}
// 协议
export function deviceAgreeCodeLists(data) {
  return request({
    url: 'admin/common/product/enum/DeviceAgreeEnum',
    method: 'get',
    pamers: data
  })
}
// 进出
export function TurnoverEnumLists(data) {
  return request({
    url: 'admin/common/product/enum/TurnoverEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
