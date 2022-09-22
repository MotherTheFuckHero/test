import request from '@/utils/request'

export function getcommunityheadLists(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head/' + id,
    method: 'delete'
  })
}

export function getWithdrawType(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/api/common/community/enum/WithdrawTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function getExpensesTypeEnum(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/api/common/community/enum/ExpensesTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function edithead(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/head_check/' + id,
    method: 'put',
    data
  })
}

export function getheadselect(id) {
  return request({
    url: process.env.VUE_APP_community_API + 'admin/community_head/' + id,
    method: 'get'
  })
}

export function getaddress(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head_address/head/' + id,
    method: 'get'
  })
}
export function addaddress(data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head_address',
    method: 'post',
    data
  })
}
export function editaddress(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head_address/' + id,
    method: 'put',
    data
  })
}
export default { add, edit, del }
