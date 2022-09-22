import request from '@/utils/request'

export function getsysroleLists(data) {
  return request({
    url: 'admin/sys_role/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_role',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_role/' + id,
    method: 'put',
    data
  })
}
export function rolePut(id, data) {
  return request({
    url: 'admin/sys_user_role/user_to_role/' + id,
    method: 'put',
    data
  })
}
export function getuserrole(id) {
  return request({
    url: 'admin/sys_user_role/user/' + id,
    method: 'get'
  })
}
export function get(id) {
  return request({
    url: 'admin/sys_role/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_role/' + id,
    method: 'delete'
  })
}
export function getRoleResource(roleId) {
  return request({
    url: 'admin/sys_role_resource/' + roleId,
    method: 'get'
  })
}

export function roletypeLists(data) {
  return request({
    url: 'admin/common/user/enum/RoleTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function getDataScope(data) {
  return request({
    url: 'admin/common/user/enum/DataScopeEnum',
    method: 'get',
    pamers: data
  })
}
export function editRoleResource(roleId, data) {
  return request({
    url: 'admin/sys_role_resource/' + roleId,
    method: 'put',
    data
  })
}
export default { add, edit, del, getRoleResource, editRoleResource }
