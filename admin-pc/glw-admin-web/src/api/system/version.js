import request from '@/utils/request'

export function getversionLists(data) {
  return request({
    url: 'admin/app_version/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/app_version',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/app_version/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/app_version/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/app_version/' + id,
    method: 'delete'
  })
}
export function typeLists(data) {
  return request({
    url: 'admin/common/sys/enum/AppTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function UpdateTypeLists(data) {
  return request({
    url: 'admin/common/sys/enum/AppUpdateTypeEnum',
    method: 'get',
    pamers: data
  })
}


export function getsts(data) {
  return request({
    url: 'admin/oss/sts_token',
    method: 'get',
    pamers: data
  })
}

export default { add, edit, del }
