import request from '@/utils/request'

export function getraffleactivityLists(data) {
  return request({
    url: 'admin/raffle_activity/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/raffle_activity',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/raffle_activity/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/raffle_activity/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/raffle_activity/' + id,
    method: 'delete'
  })
}
export function activitiesstatusLists(data) {
  return request({
    url: 'admin/common/sys/enum/RaffleStatusEnum',
    method: 'get',
    pamers: data
  })
}

export function recordList(data, params) {
  return request({
    url: 'admin/raffle_record/page_list',
    method: 'post',
    data,
    params
  })
}
export default { add, edit, del }
