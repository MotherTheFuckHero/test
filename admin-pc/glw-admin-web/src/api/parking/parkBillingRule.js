import request from '@/utils/request'

export function getparkbillingruleLists(data) {
  return request({
    url: 'admin/park_billing_rule/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/park_billing_rule',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/park_billing_rule/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/park_billing_rule/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/park_billing_rule/' + id,
    method: 'delete'
  })
}
export function RuleTypeLists(data) {
  return request({
    url: 'admin/common/product/enum/RuleTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function OutTimeLists(data) {
  return request({
    url: 'admin/common/product/enum/OutTimeEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
