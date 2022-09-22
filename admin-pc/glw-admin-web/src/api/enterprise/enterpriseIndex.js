import request from '@/utils/request'

export function enterpriseStatusList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/EnterpriseStatusEnum',
    method: 'get',
    pamers: data
  })
}

export function settlementTypeList(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/common/enterprise/enum/SettlementTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function resetPasswordPut(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + `admin/enterprise/${id}/password/reset`,
    method: 'put'
  })
}

export function infoadd(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise',
    method: 'post',
    data
  })
}

export function infoedit(id, data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise/' + id,
    method: 'put',
    data
  })
}
export function get(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_accessory/enterprise/' + id,
    method: 'get'
  })
}
export function add(id,data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_accessory/batch/' + id,
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_accessory/batch/' + id,
    method: 'put',
    data
  })
}

export function infoget(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise/' + id,
    method: 'delete'
  })
}
export function editstatus(id, status) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise/' + id+'/status/'+ status,
    method: 'put',
  })
}
export default {get, add, edit, del }
