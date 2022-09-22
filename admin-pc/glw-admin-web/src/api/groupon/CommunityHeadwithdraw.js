import request from '@/utils/request'

export function edits(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head_withdraw/' + id,
    method: 'put',
    data
  })
}
export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/community_head_withdraw/' + id + '/status',
    method: 'put',
    data
  })
}

export default { edit }
