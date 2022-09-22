import request from '@/utils/request'

export function getraffleactivityLists(data) {
  return request({
    url: 'admin/vote_theme/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/vote_theme',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/vote_theme/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/vote_theme/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/vote_theme/' + id,
    method: 'delete'
  })
}
export function voteitemList(data, params) {
  return request({
    url: 'admin/vote_item/page_list',
    method: 'post',
    data,
    params
  })
}
export function votetypeLists(data) {
  return request({
    url: 'admin/common/sys/enum/VoteThemeTypeEnum',
    method: 'get',
    pamers: data
  })
}

export default { add, edit, del }
