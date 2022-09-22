import request from '@/utils/request'

export function getsysfeedbackLists(data) {
  return request({
    url: 'admin/sys_feedback/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_feedback',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_feedback/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/sys_feedback/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/sys_feedback/' + id,
    method: 'delete'
  })
}
export function typeLists(data) {
  return request({
    url: 'admin/common/sys/enum/FeedbackTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function statusLists(data) {
  return request({
    url: 'admin/common/sys/enum/FeedbackStatusEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }
