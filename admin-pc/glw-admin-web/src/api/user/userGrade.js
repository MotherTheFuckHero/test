import request from '@/utils/request'

export function getuserGradeLists(data) {
  return request({
    url: 'admin/sys_user_grade/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/sys_user_grade',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/sys_user_grade/' + id,
    method: 'put',
    data
  })
}
export function del(id) {
  return request({
    url: 'admin/sys_user_grade/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }
