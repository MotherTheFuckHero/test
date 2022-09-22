import request from '@/utils/request'

export function add(data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_collect',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_collect/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_collect/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_collect/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
