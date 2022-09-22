import request from '@/utils/request'

export function getcityLists(data) {
  return request({
    url: 'admin/city/list',
    method: 'post',
    data
  })
}
export function companycityLists(data) {
  return request({
    url: 'admin/city/company_city',
    method: 'get',
    pamers: data
  })
}

export function add(data) {
  return request({
    url: 'admin/city',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/city/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/city/' + id,
    method: 'get'
  })
}

export function citytypeLists(data) {
  return request({
    url: 'admin/common/sys/enum/CityLevelTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function del(id) {
  return request({
    url: 'admin/city/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
