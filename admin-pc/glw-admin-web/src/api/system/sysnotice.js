import request from '@/utils/request'

export function getsysnoticeLists(data) {
  return request({
    url: 'admin/sys_notice/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_notice',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_notice/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/sys_notice/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_notice/' + id,
    method: 'delete'
  })
}

export function sysnoticetypeList(data) {
  return request({
    url: 'admin/common/dict_data/notice_type',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
