import request from '@/utils/request'

export function editEnterpriseStatus(id, status) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user/' + id + '/status/' + status,
    method: 'put'
  })
}

export function enterpriseUserList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/EnterpriseUserTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function withdrawTypeList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/WithdrawTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function expensesTypeList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/ExpensesTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function getEnterpriseList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise/list',
    method: 'post',
    data
  })
}

export function getEnterpriseUserList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user/list',
    method: 'post',
    data
  })
}

export function getAllEnterpriseUser(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user/page_list?pageNo=1&pageSize=50',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
