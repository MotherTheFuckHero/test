import request from '@/utils/request'

export function getMenusByPid(pid, params) {
  return request({
    url: 'admin/sys_resource/tree/' + pid,
    method: 'get',
    params
  })
}

export function getMenus(data) {
  return request({
    url: 'admin/sys_resource/list',
    method: 'post',
    data
  })
}

export function getMenuSuperior(ids) {
  const data = ids.length || ids.length === 0 ? ids : Array.of(ids)
  return request({
    url: 'admin/sys_resource/superior',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_resource',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'admin/sys_resource/' + ids,
    method: 'delete'
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_resource/' + id,
    method: 'put',
    data
  })
}

export default { add, edit, del, getMenusByPid, getMenuSuperior, getMenus }
