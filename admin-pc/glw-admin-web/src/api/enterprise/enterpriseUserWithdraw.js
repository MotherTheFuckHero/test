import request from '@/utils/request'

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user_withdraw/' + id + '/status',
    method: 'put',
    data
  })
}

export default { edit }
