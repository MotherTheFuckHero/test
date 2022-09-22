import request from '@/utils/request'

export function getcompanyLists(data) {
  return request({
    url: 'admin/company/list',
    method: 'post',
    data
  })
}
export function companytypeLists(data) {
  return request({
    url: 'admin/common/sys/enum/CompanyTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function add(data) {
  return request({
    url: 'admin/company',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/company/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/company/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/company/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
