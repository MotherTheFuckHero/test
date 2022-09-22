import request from '@/utils/request'

export function getstorageLists(data) {
  return request({
    url: 'admin/sys_storage/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_storage',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_storage/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/sys_storage/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_storage/' + id,
    method: 'delete'
  })
}
export function typeLists(data) {
  return request({
    url: 'admin/common/dict_data/storage_type',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
