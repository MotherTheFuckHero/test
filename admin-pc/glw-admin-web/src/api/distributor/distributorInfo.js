import request from '@/utils/request'

export function getdistributorInfoLists(data) {
  return request({
    url: process.env.VUE_APP_distributor_API + 'admin/distributor_info/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_distributor_API + 'admin/distributor_info',
    method: 'post',
    data
  })
}

// 审核
export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_distributor_API + 'admin/distributor_info/audit/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_distributor_API + 'admin/distributor_info/' + id,
    method: 'get'
  })
}
/**
 * 判断有无申请分销
 */
export function getIsDistribution(id) {
  return request({
    url: process.env.VUE_APP_distributor_API + 'api/distributor_info/merchant/' + id,
    method: 'get'
  })
}
/**
 * 提交申请
 */
export function postDistribution(data, id) {
  return request({
    url: process.env.VUE_APP_distributor_API + '/admin/distributor_info/merchant_apply/' + id,
    method: 'post',
    data
  })
}
/**
 * 再次提交申请
 */
export function postDistributions(data, id) {
  return request({
    url: process.env.VUE_APP_distributor_API + '/admin/distributor_info/' + id,
    method: 'put',
    data
  })
}
export function del(id) {
  return request({
    url: process.env.VUE_APP_distributor_API + 'admin/distributor_info/' + id,
    method: 'delete'
  })
}

// 状态
export function DistributorInfostatusLists(data) {
  return request({
    url: process.env.VUE_APP_distributor_API + '/api/common/product/enum/DistributorStatusEnum',
    method: 'get',
    pamers: data
  })
}
// 代理级别枚举
export function DistributorInfoLevelLists(data) {
  return request({
    url: process.env.VUE_APP_distributor_API + '/api/common/product/enum/DistributorLevelEnum',
    method: 'get',
    pamers: data
  })
}
// 平台佣金
export function DistributorInfoExpensesTypeLists(data) {
  return request({
    url: process.env.VUE_APP_distributor_API + '/api/common/product/enum/DistributorExpensesTypeEnum',
    method: 'get',
    pamers: data
  })
}
/**
 * 上级分销商代理列表查询
 */
export function getParentDistribution(id) {
  return request({
    url: process.env.VUE_APP_distributor_API + '/api/distributor_info/parent_list/' + id,
    method: 'get'
  })
}
export default { add, edit, del }
