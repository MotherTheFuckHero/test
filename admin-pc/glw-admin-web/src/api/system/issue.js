import request from '@/utils/request'

export function getissueLists(data) {
  return request({
    url: 'admin/sys_issue/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_issue',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_issue/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/sys_issue/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_issue/' + id,
    method: 'delete'
  })
}

export function issuetypeLists(data) {
  return request({
    url: 'admin/common/sys/enum/IssueTypeEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
